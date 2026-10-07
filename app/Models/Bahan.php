<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bahan extends Model
{
    protected $fillable = ['id_bahan', 'kode_bahan', 'total_sak', 'tanggal_masuk'];
}
