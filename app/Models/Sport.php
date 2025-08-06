<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sport extends Model
{
    protected $fillable = ['name', 'type', 'description', 'price', 'image', 'active'];

    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function areas(): BelongsToMany
    {
        return $this->belongsToMany(Area::class, 'areas_sports')
            ->withPivot('active')
            ->withTimestamps();
    }
}
