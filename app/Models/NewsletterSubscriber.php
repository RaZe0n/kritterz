<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'is_active',
        'subscribed_at'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'subscribed_at' => 'datetime',
    ];

    /**
     * Get validation rules for the model
     */
    public static function rules(): array
    {
        return [
            'email' => 'required|email|unique:newsletter_subscribers,email'
        ];
    }

    /**
     * Get custom validation messages
     */
    public static function messages(): array
    {
        return [
            'email.required' => 'E-mailadres is verplicht.',
            'email.email' => 'Voer een geldig e-mailadres in.',
            'email.unique' => 'Dit e-mailadres is al ingeschreven voor de nieuwsbrief.'
        ];
    }
}
