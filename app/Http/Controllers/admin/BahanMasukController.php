<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Bahan;
use App\Models\BahanMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BahanMasukController extends Controller
{
    public function index()
    {
        $bahan = BahanMasuk::orderBy('id', 'desc')->get();

        return Inertia::render('BahanMasuk/Index', compact('bahan'));
    }

    public function store(Request $request)
    {
        $bm = new BahanMasuk;
        $bm->tanggal = $request->tanggal;
        $bm->estimasi_sampai = $request->estimasi_sampai;
        $bm->kode_bahan = $request->kode_bahan;
        $bm->jenis_bahan = $request->jenis_bahan;
        $bm->kemasan = $request->kemasan;
        $bm->jumlah_sak = $request->jumlah_sak;
        $bm->no_kendaraan = $request->no_kendaraan;
        $bm->status_kontainer = $request->status_kontainer;
        $bm->save();

        if ($request->status_kontainer == 'Selesai Bongkar') {
            $this->tambahStok($bm->kode_bahan, $bm->jumlah_sak);
        }

        return redirect()->route('bahanmasuk')->with('success', 'Bahan masuk berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $bm = BahanMasuk::find($id);
        $old = clone $bm;

        $bm->tanggal = $request->tanggal;
        $bm->estimasi_sampai = $request->estimasi_sampai;
        $bm->kode_bahan = $request->kode_bahan;
        $bm->jenis_bahan = $request->jenis_bahan;
        $bm->kemasan = $request->kemasan;
        $bm->jumlah_sak = $request->jumlah_sak;
        $bm->no_kendaraan = $request->no_kendaraan;
        $bm->status_kontainer = $request->status_kontainer;
        $bm->update();

        if ($request->status_kontainer == 'Selesai Bongkar') {
            if ($old->status_kontainer == 'Selesai Bongkar') {
                $this->kurangiStok($old->kode_bahan, $old->jumlah_sak);
            }
            $this->tambahStok($bm->kode_bahan, $bm->jumlah_sak);
        }

        return redirect()->route('bahanmasuk')->with('success', 'Data bahan masuk berhasil diubah');
    }

    public function delete($id)
    {
        $bm = BahanMasuk::find($id);
        if ($bm->status_kontainer == 'Selesai Bongkar') {
            $this->kurangiStok($bm->kode_bahan, $bm->jumlah_sak);
        }
        $bm->delete();

        return redirect()->route('bahanmasuk')->with('success', 'Data bahan masuk berhasil dihapus');
    }

    protected function tambahStok($kodeBahan, $jumlahSak)
    {
        $bhn = Bahan::where('kode_bahan', $kodeBahan)->first();

        if ($bhn) {
            $bhn->total_sak = $bhn->total_sak + $jumlahSak;
            $bhn->tanggal_masuk = date('Y-m-d');
            $bhn->update();

            return;
        }

        $bhn = new Bahan;
        $bhn->id_bahan = $this->kodeIdBahanBaru();
        $bhn->kode_bahan = $kodeBahan;
        $bhn->total_sak = $jumlahSak;
        $bhn->tanggal_masuk = date('Y-m-d');
        $bhn->save();
    }

    protected function kurangiStok($kodeBahan, $jumlahSak)
    {
        $bhn = Bahan::where('kode_bahan', $kodeBahan)->first();
        if (! $bhn) {
            return;
        }

        $bhn->total_sak = $bhn->total_sak - $jumlahSak;

        if ($bhn->total_sak <= 0) {
            $bhn->delete();

            return;
        }

        $bhn->update();
    }

    protected function kodeIdBahanBaru()
    {
        $nomor = 1;
        $idBahan = 'BH-'.str_pad($nomor, 4, '0', STR_PAD_LEFT);

        while (Bahan::where('id_bahan', $idBahan)->exists()) {
            $nomor++;
            $idBahan = 'BH-'.str_pad($nomor, 4, '0', STR_PAD_LEFT);
        }

        return $idBahan;
    }
}
