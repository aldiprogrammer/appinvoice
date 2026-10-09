<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Produk;
use App\Models\Suratjalan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuratjalanNoDoGudangTest extends TestCase
{
    use RefreshDatabase;

    private function seedRefs(): array
    {
        $customer = new Customer;
        $customer->nama = 'TOKO UJI';
        $customer->singkatan = 'TU';
        $customer->alamat = 'JALAN UJI';
        $customer->nohp = '081234567890';
        $customer->save();

        $produk = new Produk;
        $produk->produk = 'BERAS';
        $produk->kemasan = '50';
        $produk->harga = '65000';
        $produk->kualitas = 'A';
        $produk->save();

        return [$customer, $produk];
    }

    private function payload(Customer $customer, Produk $produk, array $extra = []): array
    {
        return array_merge([
            'no_sj' => '1',
            'customer' => $customer->id,
            'alamat' => 'JALAN UJI',
            'nomor_kendaraan' => 'B 1234 CD',
            'produk' => $produk->id,
            'kemasan' => '50',
            'harga' => '65000',
            'jml_sak' => '10',
            'total_kg' => '500',
        ], $extra);
    }

    public function test_gudang_default_a_dan_no_do_kosong(): void
    {
        [$customer, $produk] = $this->seedRefs();

        $this->withSession(['username' => 'admin'])
            ->post('/suratjalan', $this->payload($customer, $produk))
            ->assertRedirect(route('suratjalan'));

        $this->assertDatabaseHas('suratjalans', ['no_do' => '', 'gudang' => 'A']);
    }

    public function test_simpan_no_do_dan_gudang_b(): void
    {
        [$customer, $produk] = $this->seedRefs();

        $this->withSession(['username' => 'admin'])
            ->post('/suratjalan', $this->payload($customer, $produk, ['no_do' => 'DO-001', 'gudang' => 'B']))
            ->assertRedirect(route('suratjalan'));

        $this->assertDatabaseHas('suratjalans', ['no_do' => 'DO-001', 'gudang' => 'B']);
    }

    public function test_gudang_tidak_valid_diganti_a(): void
    {
        [$customer, $produk] = $this->seedRefs();

        $this->withSession(['username' => 'admin'])
            ->post('/suratjalan', $this->payload($customer, $produk, ['gudang' => 'C']))
            ->assertRedirect(route('suratjalan'));

        $this->assertDatabaseHas('suratjalans', ['gudang' => 'A']);
    }

    public function test_update_no_do_dan_gudang(): void
    {
        [$customer, $produk] = $this->seedRefs();

        $this->withSession(['username' => 'admin'])
            ->post('/suratjalan', $this->payload($customer, $produk));

        $sj = Suratjalan::first();

        $this->withSession(['username' => 'admin'])
            ->put('/suratjalan/'.$sj->id, $this->payload($customer, $produk, ['no_do' => 'DO-009', 'gudang' => 'B']))
            ->assertRedirect();

        $this->assertDatabaseHas('suratjalans', ['id' => $sj->id, 'no_do' => 'DO-009', 'gudang' => 'B']);
    }
}
