<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image',
        'location',
        'date_range',
        'opening_hours',
        'ticket_info',
        'status',
        'start_date',
        'end_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    /**
     * Get the status label in Dutch.
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'current' => 'Huidig',
            'upcoming' => 'Aankomend',
            'past' => 'Afgelopen',
            default => 'Onbekend'
        };
    }

    /**
     * Scope to get only current events.
     */
    public function scopeCurrent($query)
    {
        return $query->where('status', 'current');
    }

    /**
     * Scope to get only upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    /**
     * Scope to get only past events.
     */
    public function scopePast($query)
    {
        return $query->where('status', 'past');
    }

    /**
     * Check if event is currently running.
     */
    public function isCurrentlyRunning(): bool
    {
        if (!$this->start_date || !$this->end_date) {
            return false;
        }

        $now = Carbon::now();
        return $now->between($this->start_date, $this->end_date);
    }

    /**
     * Check if event is in the future.
     */
    public function isUpcoming(): bool
    {
        if (!$this->start_date) {
            return false;
        }

        return Carbon::now()->lt($this->start_date);
    }

    /**
     * Check if event is in the past.
     */
    public function isPast(): bool
    {
        if (!$this->end_date) {
            return false;
        }

        return Carbon::now()->gt($this->end_date);
    }
}
