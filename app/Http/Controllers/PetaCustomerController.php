<?php

namespace App\Http\Controllers;

use App\Models\CustomerMapping;
use Inertia\Inertia;

class PetaCustomerController extends Controller
{
    public function index()
    {
        $mappings = CustomerMapping::query()
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->orderBy('nama_toko')
            ->get(['id', 'nama_toko', 'alamat', 'produk', 'latitude', 'longitude', 'status']);

        return Inertia::render('PetaCustomer', [
            'mappings' => $mappings,
        ]);
    }
}
