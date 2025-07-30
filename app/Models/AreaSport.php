<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaSport extends Model
{
    protected $table = 'areas_sports';

    protected $fillable = ['area_id', 'sport_id', 'active'];
}
