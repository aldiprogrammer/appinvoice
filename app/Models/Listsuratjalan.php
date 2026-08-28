<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listsuratjalan extends Model
{
    protected $fillable = [
        'no_sj', 'nomor_kendaraan', 'status_cetak', 'status', 'tanggal', 'id_user', 'user_setujui', 'cetak',
    ];

    protected $with = ['userSetujui'];

    public function suratjalan(): BelongsTo
    {
        return $this->belongsTo(Suratjalan::class, 'no_sj', 'no_sj');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Pengguna::class, 'id_user');
    }

    public function userSetujui(): BelongsTo
    {
        return $this->belongsTo(Pengguna::class, 'user_setujui');
    }
}
