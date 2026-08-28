<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listinvoice extends Model
{
    protected $fillable = ['kode', 'kode_invoice', 'no_po', 'status_cetak', 'status', 'tanggal', 'id_user', 'user_setujui', 'cetak'];

    protected $with = ['userSetujui'];

    public function inv()
    {
        return $this->belongsTo(Invoice::class, 'kode_invoice', 'kode_invoice');
    }

    public function user()
    {
        return $this->belongsTo(Pengguna::class, 'id_user');
    }

    public function userSetujui()
    {
        return $this->belongsTo(Pengguna::class, 'user_setujui');
    }
}
