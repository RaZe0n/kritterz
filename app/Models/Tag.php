<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'color',
        'description',
    ];

    /**
     * Get the artworks that belong to this tag.
     */
    public function artworks()
    {
        return $this->belongsToMany(Artwork::class);
    }
}
