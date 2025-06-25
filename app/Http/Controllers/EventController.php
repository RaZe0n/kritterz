<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     */
    public function index()
    {
        $currentEvents = Event::current()->get();
        $upcomingEvents = Event::upcoming()->get();
        $recentEvents = Event::past()->get();
        
        return Inertia::render('Exhibitions', [
            'currentEvents' => $currentEvents,
            'upcomingEvents' => $upcomingEvents,
            'recentEvents' => $recentEvents
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        return Inertia::render('dashboard/events/create');
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required|string|max:255',
            'date_range' => 'required|string|max:255',
            'opening_hours' => 'nullable|string|max:255',
            'ticket_info' => 'nullable|string|max:255',
            'status' => 'required|in:current,upcoming,past',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $imagePath = $request->file('image')->store('events', 'public');

        Event::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image' => '/storage/' . $imagePath,
            'location' => $validated['location'],
            'date_range' => $validated['date_range'],
            'opening_hours' => $validated['opening_hours'],
            'ticket_info' => $validated['ticket_info'],
            'status' => $validated['status'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);

        return redirect()->route('dashboard.exhibitions')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified event.
     */
    public function show(Event $event)
    {
        return Inertia::render('dashboard/events/show', [
            'event' => $event
        ]);
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Event $event)
    {
        return Inertia::render('dashboard/events/edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required|string|max:255',
            'date_range' => 'required|string|max:255',
            'opening_hours' => 'nullable|string|max:255',
            'ticket_info' => 'nullable|string|max:255',
            'status' => 'required|in:current,upcoming,past',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'date_range' => $validated['date_range'],
            'opening_hours' => $validated['opening_hours'],
            'ticket_info' => $validated['ticket_info'],
            'status' => $validated['status'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($event->image && Storage::disk('public')->exists(str_replace('/storage/', '', $event->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $event->image));
            }
            
            $imagePath = $request->file('image')->store('events', 'public');
            $data['image'] = '/storage/' . $imagePath;
        }

        $event->update($data);

        return redirect()->route('dashboard.exhibitions')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        // Delete image file
        if ($event->image && Storage::disk('public')->exists(str_replace('/storage/', '', $event->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $event->image));
        }

        $event->delete();

        return redirect()->route('dashboard.exhibitions')->with('success', 'Event deleted successfully.');
    }

    /**
     * Get all events for API consumption.
     */
    public function getAll()
    {
        return Event::all();
    }

    /**
     * Get only current events.
     */
    public function getCurrent()
    {
        return Event::current()->get();
    }

    /**
     * Get only upcoming events.
     */
    public function getUpcoming()
    {
        return Event::upcoming()->get();
    }

    /**
     * Get only past events.
     */
    public function getPast()
    {
        return Event::past()->get();
    }

    /**
     * Get events for homepage.
     */
    public function getForHomepage()
    {
        return Event::current()->take(2)->get();
    }
}
