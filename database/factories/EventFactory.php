<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Silverware Through Time', 'Modern Metalwork', 'Sustainable Art', 'Silver Stories',
            'Cutlery Canvas', 'Table Tales', 'Dining Art', 'Silver Sculptures',
            'Metallic Memories', 'Culinary Creations', 'Fork Fusion', 'Spoon Serenade'
        ];

        $descriptions = [
            'Een reis door de geschiedenis van bestek kunst, met focus op vintage transformaties.',
            'Hedendaagse interpretaties van klassiek bestek in moderne kunst.',
            'Een tentoonstelling over duurzame kunst met hergebruikte materialen.',
            'Een retrospectief van zilverwerk en bestek kunst.',
            'A solo exhibition featuring the latest collection of cutlery art.',
            'An immersive experience in the world of repurposed dining tools.',
            'Where culinary meets creativity in contemporary art.',
            'Transforming everyday objects into extraordinary art pieces.'
        ];

        $locations = [
            'Kunstgalerie Amsterdam', 'Design Museum Den Haag', 'Eco Art Space Rotterdam',
            'Galerie Utrecht', 'Modern Art Gallery, Amsterdam', 'Contemporary Museum, Rotterdam',
            'Art Center The Hague', 'Rotterdam Art Foundation', 'Amsterdam Contemporary'
        ];

        $status = $this->faker->randomElement(['current', 'upcoming', 'past']);
        
        // Generate dates based on status
        $startDate = null;
        $endDate = null;
        
        if ($status === 'past') {
            $startDate = $this->faker->dateTimeBetween('-6 months', '-2 months');
            $endDate = $this->faker->dateTimeBetween($startDate, '-1 month');
        } elseif ($status === 'current') {
            $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
            $endDate = $this->faker->dateTimeBetween('now', '+2 months');
        } else { // upcoming
            $startDate = $this->faker->dateTimeBetween('+1 month', '+6 months');
            $endDate = $this->faker->dateTimeBetween($startDate, '+8 months');
        }

        return [
            'title' => $this->faker->randomElement($titles),
            'description' => $this->faker->randomElement($descriptions),
            'image' => '/storage/images/cazemier.jpg',
            'location' => $this->faker->randomElement($locations),
            'date_range' => $startDate->format('d M') . ' - ' . $endDate->format('d M Y'),
            'opening_hours' => $this->faker->optional()->randomElement([
                'Di-Zo: 10:00 - 17:00',
                'Ma-Za: 11:00 - 18:00',
                'Wo-Zo: 12:00 - 19:00'
            ]),
            'ticket_info' => $this->faker->optional()->randomElement([
                'Gratis entree',
                '€10 regulier, €5 studenten',
                '€15 regulier, €8 studenten'
            ]),
            'status' => $status,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }
}
