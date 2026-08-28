<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventaris extends Model
{
    protected $fillable = ['kode_barang', 'nama_barang', 'tanggal_masuk', 'kondisi', 'letak'];
}
