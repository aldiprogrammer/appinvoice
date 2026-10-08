<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ordercustomer extends Model
{
    protected $table = 'ordercustomers';

    protected $fillable = [
        'tanggal', 'nama_customer', 'no_bon', 'no_sj', 'kode_item',
        'barang', 'gudang', 'zak', 'kg', 'total_kg', 'harga',
        'tambahan_harga_beras', 'jumlah',
    ];
}
