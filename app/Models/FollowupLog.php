<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowupLog extends Model
{
    protected $fillable = [
        'customer_name',
        'last_tanggal',
        'last_no_bon',
        'last_no_sj',
        'followed_up_at',
    ];

    protected $casts = [
        'followed_up_at' => 'datetime',
    ];
}
