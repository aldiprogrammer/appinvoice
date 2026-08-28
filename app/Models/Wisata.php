<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wisata extends Model
{
    protected $fillable = ['kategori', 'ketarangan', 'gambar', 'lokasi', 'rating', 'latitude', 'longitude'];
}
