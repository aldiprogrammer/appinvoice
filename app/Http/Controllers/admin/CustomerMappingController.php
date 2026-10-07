<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerMapping;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerMappingController extends Controller
{
    public function index()
    {
        $mappings = CustomerMapping::orderBy('id', 'desc')->get();

        return Inertia::render('CustomerMapping/Index', [
            'mappings' => $mappings,
            'produkOptions' => CustomerMapping::PRODUK_LIST,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_toko' => 'required|string|max:100',
            'alamat' => 'required|string',
            'produk' => 'required|string|max:100',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'status' => 'required|string|max:20',
        ]);

        CustomerMapping::create($request->only('nama_toko', 'alamat', 'produk', 'latitude', 'longitude', 'status'));

        return redirect()->route('customermapping')->with('success', 'Customer mapping berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_toko' => 'required|string|max:100',
            'alamat' => 'required|string',
            'produk' => 'required|string|max:100',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'status' => 'required|string|max:20',
        ]);

        $item = CustomerMapping::find($id);
        $item->update($request->only('nama_toko', 'alamat', 'produk', 'latitude', 'longitude', 'status'));

        return redirect()->route('customermapping')->with('success', 'Customer mapping berhasil diubah');
    }

    public function delete($id)
    {
        $item = CustomerMapping::find($id);
        $item->delete();

        return redirect()->route('customermapping')->with('success', 'Customer mapping berhasil dihapus');
    }
}
