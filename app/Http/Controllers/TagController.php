<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the tags.
     */
    public function index()
    {
        $tags = Tag::withCount('artworks')->get();
        
        return Inertia::render('dashboard/tags/index', [
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new tag.
     */
    public function create()
    {
        return Inertia::render('dashboard/tags/create');
    }

    /**
     * Store a newly created tag in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags',
            'color' => 'required|string|max:7',
            'description' => 'nullable|string',
        ]);

        Tag::create($validated);

        return redirect()->route('dashboard.tags.index')->with('success', 'Tag created successfully.');
    }

    /**
     * Display the specified tag.
     */
    public function show(Tag $tag)
    {
        $tag->load('artworks');
        
        return Inertia::render('dashboard/tags/show', [
            'tag' => $tag
        ]);
    }

    /**
     * Show the form for editing the specified tag.
     */
    public function edit(Tag $tag)
    {
        return Inertia::render('dashboard/tags/edit', [
            'tag' => $tag
        ]);
    }

    /**
     * Update the specified tag in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
            'color' => 'required|string|max:7',
            'description' => 'nullable|string',
        ]);

        $tag->update($validated);

        return redirect()->route('dashboard.tags.index')->with('success', 'Tag updated successfully.');
    }

    /**
     * Remove the specified tag from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('dashboard.tags.index')->with('success', 'Tag deleted successfully.');
    }

    /**
     * Get all tags for API consumption.
     */
    public function getAll()
    {
        return Tag::all();
    }
}
