<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = ['kode', 'kode_invoice', 'no_po', 'id_customer', 'customer', 'tanggal', 'produk', 'id_produk', 'harga', 'kemasan', 'total_harga', 'jml_sak', 'status_cetak', 'id_user', 'status'];

    public function customernew(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'id_customer');
    }

    public function produknew(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
