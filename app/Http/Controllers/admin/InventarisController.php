<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Inventaris;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarisController extends Controller
{
    public function index()
    {
        $inventaris = Inventaris::all();
        $bulan = date('Y-m');
        do {
            $nextKode = 'BRG-'.$bulan.'-'.random_int(1000, 9999);
        } while (Inventaris::where('kode_barang', $nextKode)->exists());

        return Inertia::render('Inventaris/Index', compact('inventaris', 'nextKode'));
    }

    public function store(Request $request)
    {
        $it = new Inventaris;
        $it->kode_barang = $request->kode_barang;
        $it->nama_barang = $request->nama_barang;
        $it->tanggal_masuk = $request->tanggal_masuk;
        $it->kondisi = $request->kondisi;
        $it->letak = $request->letak;
        $it->save();

        return redirect()->route('inventaris')->with('success', 'Barang berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $it = Inventaris::find($id);
        $it->kode_barang = $request->kode_barang;
        $it->nama_barang = $request->nama_barang;
        $it->tanggal_masuk = $request->tanggal_masuk;
        $it->kondisi = $request->kondisi;
        $it->letak = $request->letak;
        $it->update();

        return redirect()->route('inventaris')->with('success', 'Barang berhasil diubah');
    }

    public function delete($id)
    {
        $it = Inventaris::find($id);
        $it->delete();

        return redirect()->route('inventaris')->with('success', 'Barang berhasil dihapus');
    }

    public function label(Request $request)
    {
        $ids = array_filter(array_map('intval', explode(',', $request->query('ids', ''))));
        $items = Inventaris::whereIn('id', $ids)->get();

        return view('admin/label-inventaris', compact('items'));
    }
}
