<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Area extends Model
{
    protected $fillable = ['location', 'address'];

    public function employee(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function sports(): BelongsToMany
    {
        return $this->belongsToMany(Sport::class, 'areas_sports')
            ->withPivot('active')
            ->withTimestamps();
    }
}
