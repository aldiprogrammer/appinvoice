<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerMapping extends Model
{
    public const PRODUK_LIST = [
        'Ratumerak',
        'Genthong',
        'Sintanola',
        'Markisa',
        'Pisces',
        'Taurus',
        'Genthong Eko',
    ];

    protected $table = 'customer_mappings';

    protected $fillable = ['nama_toko', 'alamat', 'produk', 'latitude', 'longitude', 'status'];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function getProdukListAttribute(): array
    {
        return array_values(array_filter(array_map('trim', explode(',', (string) $this->produk))));
    }
}
