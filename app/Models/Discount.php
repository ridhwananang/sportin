<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Discount extends Model
{
    protected $fillable = ['percentage', 'description', 'voucher_code'];

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
