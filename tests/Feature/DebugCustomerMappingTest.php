<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DebugCustomerMappingTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_customer_mapping(): void
    {
        $response = $this->withSession(['username' => 'admin'])->post('/customer-mapping', [
            'nama_toko' => 'TOKO UJI',
            'alamat' => 'JALAN UJI',
            'produk' => 'BERAS',
            'latitude' => '3.5952',
            'longitude' => '98.6722',
            'status' => 'Aktif',
        ]);

        dump($response->getStatusCode(), $response->headers->get('Location'));
        dump(session('errors')?->all());
        dump(\App\Models\CustomerMapping::all()->toArray());
        $this->assertDatabaseHas('customer_mappings', ['nama_toko' => 'TOKO UJI']);
    }

    public function test_store_with_empty_coordinates(): void
    {
        $response = $this->withSession(['username' => 'admin'])->post('/customer-mapping', [
            'nama_toko' => 'TOKO KOSONG',
            'alamat' => 'JALAN UJI',
            'produk' => 'BERAS',
            'latitude' => '',
            'longitude' => '',
            'status' => 'Aktif',
        ], ['Referer' => 'http://localhost/customer-mapping']);

        dump('status: '.$response->getStatusCode());
        dump('location: '.$response->headers->get('Location'));
        dump('errors: '.json_encode(session('errors')?->all()));
        $this->assertDatabaseHas('customer_mappings', ['nama_toko' => 'TOKO KOSONG']);
    }
}
