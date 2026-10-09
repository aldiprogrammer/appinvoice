<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index()
    {
        $produk = Produk::orderBy('id', 'desc')->get();

        return Inertia::render('Produk/Index', compact('produk'));
    }

    public function store(Request $request)
    {
        $pr = new Produk;
        $pr->produk = $request->produk;
        $pr->harga = $request->harga;
        $pr->kemasan = $request->kemasan;
        $pr->kualitas = $request->kualitas;
        $pr->save();

        return redirect()->route('produk')->with('success', 'Produk berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $pr = Produk::find($id);
        $pr->produk = $request->produk;
        $pr->harga = $request->harga;
        $pr->kemasan = $request->kemasan;
        $pr->kualitas = $request->kualitas;
        $pr->update();

        return redirect()->route('produk')->with('success', 'Produk berhasil diubah');
    }

    public function delete($id)
    {
        $pr = Produk::find($id);
        $pr->delete();

        return redirect()->route('produk')->with('success', 'Produk berhasil dihapus');
    }

    public function detail($id)
    {
        $pr = Produk::find($id);

        return response()->json($pr);
    }
}
