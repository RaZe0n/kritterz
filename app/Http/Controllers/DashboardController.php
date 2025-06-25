<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index()
    {
        // Fetch live data
        $artworks = Artwork::all();
        $currentEvents = Event::current()->get();
        $upcomingEvents = Event::upcoming()->get();
        $pastEvents = Event::past()->get();
        
        // Calculate statistics
        $totalArtworks = $artworks->count();
        $soldArtworks = $artworks->where('status', 'sold')->count();
        $availableArtworks = $artworks->where('status', 'for sale')->count();
        $currentExhibitionsCount = $currentEvents->count();
        $upcomingExhibitionsCount = $upcomingEvents->count();
        
        // Calculate total revenue (placeholder - would need price field in database)
        $totalRevenue = 0; // This would be calculated from actual sales data
        
        // Generate recent activity based on actual data
        $recentActivity = $this->generateRecentActivity($artworks, $currentEvents, $upcomingEvents);
        
        // Get recent artworks for status overview
        $recentArtworks = $artworks->take(5);
        
        return Inertia::render('dashboard', [
            'artworks' => $artworks,
            'currentExhibitions' => $currentEvents,
            'upcomingExhibitions' => $upcomingEvents,
            'recentArtworks' => $recentArtworks,
            'recentActivity' => $recentActivity,
            'stats' => [
                'totalArtworks' => $totalArtworks,
                'soldArtworks' => $soldArtworks,
                'availableArtworks' => $availableArtworks,
                'totalRevenue' => $totalRevenue,
                'currentExhibitionsCount' => $currentExhibitionsCount,
                'upcomingExhibitionsCount' => $upcomingExhibitionsCount,
            ]
        ]);
    }

    /**
     * Display the gallery management dashboard.
     */
    public function gallery()
    {
        $artworks = Artwork::with('tags')->get();
        
        $stats = [
            'total' => $artworks->count(),
            'forSale' => $artworks->where('status', 'for sale')->count(),
            'sold' => $artworks->where('status', 'sold')->count(),
            'totalValue' => 0 // We'll need to add price field to artworks table later
        ];

        return Inertia::render('dashboard/gallery', [
            'artworks' => $artworks,
            'stats' => $stats
        ]);
    }

    /**
     * Display the exhibitions management dashboard.
     */
    public function exhibitions()
    {
        $currentExhibitions = Event::current()->get();
        $upcomingExhibitions = Event::upcoming()->get();
        $pastExhibitions = Event::past()->get();
        
        $allExhibitions = $currentExhibitions->concat($upcomingExhibitions)->concat($pastExhibitions);
        
        $stats = [
            'total' => $allExhibitions->count(),
            'active' => $currentExhibitions->count(),
            'upcoming' => $upcomingExhibitions->count(),
            'completed' => $pastExhibitions->count(),
        ];

        return Inertia::render('dashboard/exhibitions', [
            'currentExhibitions' => $currentExhibitions,
            'upcomingExhibitions' => $upcomingExhibitions,
            'pastExhibitions' => $pastExhibitions,
            'stats' => $stats
        ]);
    }

    /**
     * Generate recent activity based on actual data.
     */
    private function generateRecentActivity($artworks, $currentEvents, $upcomingEvents)
    {
        $activities = [];
        
        // Add recent exhibitions
        foreach ($currentEvents->take(2) as $event) {
            $activities[] = [
                'id' => 'event_' . $event->id,
                'title' => 'Exhibition started',
                'description' => "{$event->title} started at {$event->location}",
                'time' => $this->getTimeAgo($event->created_at),
                'type' => 'exhibition'
            ];
        }
        
        // Add recent sold artworks
        $recentSold = $artworks->where('status', 'sold')->take(2);
        foreach ($recentSold as $artwork) {
            $activities[] = [
                'id' => 'sold_' . $artwork->id,
                'title' => 'Artwork sold',
                'description' => "{$artwork->title} was sold",
                'time' => $this->getTimeAgo($artwork->updated_at),
                'type' => 'sale'
            ];
        }
        
        // Add recent new artworks
        $recentNew = $artworks->take(2);
        foreach ($recentNew as $artwork) {
            $activities[] = [
                'id' => 'new_' . $artwork->id,
                'title' => 'New artwork added',
                'description' => "{$artwork->title} was added to the collection",
                'time' => $this->getTimeAgo($artwork->created_at),
                'type' => 'creation'
            ];
        }
        
        // Sort by creation/update time and take the most recent 4
        usort($activities, function($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });
        
        return array_slice($activities, 0, 4);
    }

    /**
     * Get human-readable time ago.
     */
    private function getTimeAgo($timestamp)
    {
        $time = Carbon::parse($timestamp);
        $now = Carbon::now();
        
        if ($time->diffInHours($now) < 1) {
            return $time->diffInMinutes($now) . ' minutes ago';
        } elseif ($time->diffInDays($now) < 1) {
            return $time->diffInHours($now) . ' hours ago';
        } elseif ($time->diffInDays($now) < 7) {
            return $time->diffInDays($now) . ' days ago';
        } else {
            return $time->diffInWeeks($now) . ' weeks ago';
        }
    }
} 