<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SportImage extends Model
{
    use HasFactory;

    protected $fillable = ['sport_id', 'image'];

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }
}
