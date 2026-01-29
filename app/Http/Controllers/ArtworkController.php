<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArtworkController extends Controller
{
    /**
     * Display a listing of the artworks.
     */
    public function index()
    {
        $artworks = Artwork::with(['tags' => function($q) { $q->orderBy('order'); }])->get();
        $tags = Tag::orderBy('order')->get();
        
        return Inertia::render('Gallery', [
            'artworks' => $artworks,
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new artwork.
     */
    public function create()
    {
        $tags = Tag::all();
        
        return Inertia::render('dashboard/artworks/create', [
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created artwork in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480',
            'status' => 'required|in:for sale,sold',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        $imagePath = $request->file('image')->store('artworks', 'public');

        $artwork = Artwork::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => '/storage/' . $imagePath,
            'status' => $validated['status'],
        ]);

        if (isset($validated['tag_ids'])) {
            $artwork->tags()->attach($validated['tag_ids']);
        }

        return redirect()->route('dashboard.gallery')->with('success', 'Artwork created successfully.');
    }

    /**
     * Display the specified artwork.
     */
    public function show(Artwork $artwork)
    {
        $artwork->load('tags');
        
        return Inertia::render('dashboard/artworks/show', [
            'artwork' => $artwork
        ]);
    }

    /**
     * Show the form for editing the specified artwork.
     */
    public function edit(Artwork $artwork)
    {
        $artwork->load('tags');
        $tags = Tag::all();
        
        return Inertia::render('dashboard/artworks/edit', [
            'artwork' => $artwork,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified artwork in storage.
     */
    public function update(Request $request, Artwork $artwork)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20480',
            'status' => 'required|in:for sale,sold',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($artwork->image && Storage::disk('public')->exists(str_replace('/storage/', '', $artwork->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $artwork->image));
            }
            
            $imagePath = $request->file('image')->store('artworks', 'public');
            $data['image'] = '/storage/' . $imagePath;
        }

        $artwork->update($data);

        // Sync tags
        $artwork->tags()->sync($validated['tag_ids'] ?? []);

        return redirect()->route('dashboard.gallery')->with('success', 'Artwork updated successfully.');
    }

    /**
     * Remove the specified artwork from storage.
     */
    public function destroy(Artwork $artwork)
    {
        // Delete image file
        if ($artwork->image && Storage::disk('public')->exists(str_replace('/storage/', '', $artwork->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $artwork->image));
        }

        $artwork->delete();

        return redirect()->route('dashboard.gallery')->with('success', 'Artwork deleted successfully.');
    }

    /**
     * Get all artworks for API consumption.
     */
    public function getAll()
    {
        return Artwork::with('tags')->get();
    }

    /**
     * Get only artworks for sale.
     */
    public function getForSale()
    {
        return Artwork::with('tags')->forSale()->get();
    }

    /**
     * Get only sold artworks.
     */
    public function getSold()
    {
        return Artwork::with('tags')->sold()->get();
    }

    /**
     * Get artworks for a tag, ordered by the pivot 'order' column.
     */
    public function getArtworksForTag(Request $request, Tag $tag)
    {
        // Only allow admin
        if (!$request->user() || !$request->user()->hasDashboardAccess()) {
            abort(403);
        }
        $artworks = $tag->artworks()->with('tags')->get();
        return response()->json(['artworks' => $artworks]);
    }

    /**
     * Update the order of artworks for a tag.
     * Expects: { order: [artwork_id1, artwork_id2, ...] }
     */
    public function updateArtworksOrder(Request $request, Tag $tag)
    {
        // Only allow admin
        if (!$request->user() || $request->user()->role !== 'admin') {
            abort(403);
        }
        $order = $request->input('order');
        if (!is_array($order)) {
            return response()->json(['error' => 'Invalid order data'], 422);
        }
        // Update each artwork's order in the pivot
        foreach ($order as $index => $artworkId) {
            $tag->artworks()->updateExistingPivot($artworkId, ['order' => $index]);
        }
        return response()->json(['success' => true]);
    }
}
