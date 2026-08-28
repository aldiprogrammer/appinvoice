<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengguna extends Model
{
    protected $fillable = ['username', 'nama', 'password', 'level', 'hak_akses'];

    protected $hidden = ['password'];
}
