<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Silverware Through Time',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Kunstgalerie Amsterdam',
                'date_range' => '1 Mei - 30 Juni 2024',
                'description' => 'Een reis door de geschiedenis van bestek kunst, met focus op vintage transformaties.',
                'opening_hours' => 'Di-Zo: 10:00 - 17:00',
                'ticket_info' => 'Gratis entree',
                'status' => 'current',
                'start_date' => '2024-05-01',
                'end_date' => '2024-06-30'
            ],
            [
                'title' => 'Modern Metalwork',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Design Museum Den Haag',
                'date_range' => '15 Mei - 15 Juli 2024',
                'description' => 'Hedendaagse interpretaties van klassiek bestek in moderne kunst.',
                'opening_hours' => 'Ma-Za: 11:00 - 18:00',
                'ticket_info' => '€10 regulier, €5 studenten',
                'status' => 'current',
                'start_date' => '2024-05-15',
                'end_date' => '2024-07-15'
            ],
            [
                'title' => 'Sustainable Art',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Eco Art Space Rotterdam',
                'date_range' => '1 Augustus - 30 September 2024',
                'description' => 'Een tentoonstelling over duurzame kunst met hergebruikte materialen.',
                'status' => 'upcoming',
                'start_date' => '2024-08-01',
                'end_date' => '2024-09-30'
            ],
            [
                'title' => 'Silver Stories',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Galerie Utrecht',
                'date_range' => '1 Maart - 30 April 2024',
                'description' => 'Een retrospectief van zilverwerk en bestek kunst.',
                'status' => 'past',
                'start_date' => '2024-03-01',
                'end_date' => '2024-04-30'
            ],
            [
                'title' => 'Expo 1',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Modern Art Gallery, Amsterdam',
                'date_range' => 'June 1 - July 30, 2024',
                'description' => 'A solo exhibition featuring the latest collection of cutlery art.',
                'status' => 'current',
                'start_date' => '2024-06-01',
                'end_date' => '2024-07-30'
            ],
            [
                'title' => 'Expo 2',
                'image' => '/resources/images/zwaan.JPG',
                'location' => 'Contemporary Museum, Rotterdam',
                'date_range' => 'August 15 - September 20, 2024',
                'description' => 'An immersive experience in the world of repurposed dining tools.',
                'status' => 'upcoming',
                'start_date' => '2024-08-15',
                'end_date' => '2024-09-20'
            ]
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
} 