<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BahanMasuk extends Model
{
    protected $fillable = ['tanggal', 'estimasi_sampai', 'kode_bahan', 'jenis_bahan', 'kemasan', 'jumlah_sak', 'no_kendaraan', 'status_kontainer'];
}
