<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Suratjalan extends Model
{
    protected $fillable = [
        'no_sj', 'tanggal', 'id_customer', 'customer', 'alamat', 'nomor_kendaraan',
        'no_do', 'gudang',
        'id_produk', 'produk', 'kemasan', 'harga', 'jml_sak', 'total_kg',
        'status_cetak', 'status',
    ];

    public function customernew(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function produknew(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
