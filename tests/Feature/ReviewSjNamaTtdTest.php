<?php

namespace Tests\Feature;

use App\Models\Listsuratjalan;
use App\Models\Pengguna;
use App\Models\Suratjalan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewSjNamaTtdTest extends TestCase
{
    use RefreshDatabase;

    public function test_nama_ttd_mengikuti_pengguna_login_dengan_huruf_kapital(): void
    {
        $user = new Pengguna;
        $user->username = 'budi';
        $user->nama = 'Budi Santoso';
        $user->password = bcrypt('secret');
        $user->level = 'admin';
        $user->save();

        $sj = new Suratjalan;
        $sj->no_sj = '1';
        $sj->tanggal = '2026-10-08';
        $sj->id_customer = '1';
        $sj->customer = 'TOKO UJI';
        $sj->alamat = 'JALAN UJI';
        $sj->id_produk = '1';
        $sj->produk = 'BERAS';
        $sj->kemasan = '50';
        $sj->harga = '65000';
        $sj->jml_sak = '10';
        $sj->total_kg = '500';
        $sj->status_cetak = 0;
        $sj->status = 0;
        $sj->save();

        $ls = new Listsuratjalan;
        $ls->no_sj = '1';
        $ls->status_cetak = 1;
        $ls->status = 0;
        $ls->tanggal = '2026-10-08';
        $ls->id_user = $user->id;
        $ls->user_setujui = '';
        $ls->cetak = 0;
        $ls->save();

        $session = ['username' => 'budi', 'id_user' => $user->id, 'level' => 'admin'];

        $this->withSession($session)
            ->get('/review-sj/1')
            ->assertOk()
            ->assertSee('BUDI SANTOSO')
            ->assertDontSee('Budi Santoso');

        $this->withSession($session)
            ->get('/review-preview-sj/1')
            ->assertOk()
            ->assertSee('BUDI SANTOSO')
            ->assertDontSee('Budi Santoso');
    }

    public function test_nama_ttd_fallback_ke_username(): void
    {
        $user = new Pengguna;
        $user->username = 'staff01';
        $user->password = bcrypt('secret');
        $user->level = 'staff';
        $user->save();

        $sj = new Suratjalan;
        $sj->no_sj = '2';
        $sj->tanggal = '2026-10-08';
        $sj->id_customer = '1';
        $sj->customer = 'TOKO UJI';
        $sj->alamat = 'JALAN UJI';
        $sj->id_produk = '1';
        $sj->produk = 'BERAS';
        $sj->kemasan = '50';
        $sj->harga = '65000';
        $sj->jml_sak = '10';
        $sj->total_kg = '500';
        $sj->status_cetak = 0;
        $sj->status = 0;
        $sj->save();

        $ls = new Listsuratjalan;
        $ls->no_sj = '2';
        $ls->status_cetak = 1;
        $ls->status = 0;
        $ls->tanggal = '2026-10-08';
        $ls->id_user = $user->id;
        $ls->user_setujui = '';
        $ls->cetak = 0;
        $ls->save();

        $this->withSession(['username' => 'staff01', 'id_user' => $user->id, 'level' => 'staff'])
            ->get('/review-sj/2')
            ->assertOk()
            ->assertSee('STAFF01');
    }
}
