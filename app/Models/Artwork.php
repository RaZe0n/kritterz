<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Artwork extends Model
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
        'status',
    ];

    /**
     * Get the tags that belong to this artwork.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'artwork_tag')->withPivot('order');
    }

    public function translations()
    {
        return $this->hasMany(ArtworkTranslation::class);
    }

    public function getTranslatedTitleAttribute(): string
    {
        $locale = App::getLocale();
        $defaultLocale = config('locales.default', config('app.locale', 'en'));

        $translation = $this->translations->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', $defaultLocale);

        return $translation?->title ?? $this->title;
    }

    public function getTranslatedDescriptionAttribute(): string
    {
        $locale = App::getLocale();
        $defaultLocale = config('locales.default', config('app.locale', 'en'));

        $translation = $this->translations->firstWhere('locale', $locale)
            ?? $this->translations->firstWhere('locale', $defaultLocale);

        return $translation?->description ?? $this->description;
    }

    /**
     * Get the status label in Dutch.
     */
    public function getStatusLabelAttribute(): string
    {
        return $this->status === 'sold' ? 'Verkocht' : 'Te Koop';
    }

    /**
     * Scope to get only artworks for sale.
     */
    public function scopeForSale($query)
    {
        return $query->where('status', 'for sale');
    }

    /**
     * Scope to get only sold artworks.
     */
    public function scopeSold($query)
    {
        return $query->where('status', 'sold');
    }
}
