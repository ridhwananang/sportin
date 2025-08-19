<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'customer_name',
        'kode_booking',
        'status',
        'start_at',
        'end_at',
        'payment_status',
        'created_by',
        'user_id',
        'sport_id',
        'area_id',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $appends = ['time_slot']; // ✅ otomatis ikut di JSON


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    // Akses format tanggal saja
    public function getDateAttribute()
    {
        return $this->start_at ? $this->start_at->format('Y-m-d') : null;
    }

    // Akses rentang jam
    public function getTimeSlotAttribute()
    {
        if (!$this->start_at || !$this->end_at) {
            return null;
        }
        return $this->start_at->format('H:i') . ' - ' . $this->end_at->format('H:i');
    }
}
