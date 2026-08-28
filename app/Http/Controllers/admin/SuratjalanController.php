<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Listsuratjalan;
use App\Models\Nosj;
use App\Models\Produk;
use App\Models\Suratjalan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SuratjalanController extends Controller
{
    public function index()
    {
        $nosj = Nosj::first();
        $lastSj = Listsuratjalan::orderBy('id', 'desc')->first();

        if ($lastSj) {
            $no_sj = $lastSj->no_sj + 1;
        } else {
            $no_sj = $nosj->nomor + 1;
        }

        $customer = Customer::all();
        $produk = Produk::all();
        $sj = Suratjalan::with('customernew', 'produknew')->where('no_sj', $no_sj)->get();
        $listkode = Suratjalan::where('no_sj', $no_sj)->with('customernew')->first();
        $total = Suratjalan::where('no_sj', $no_sj)->sum('total_kg');

        return Inertia::render('SuratJalan/Create', compact('customer', 'produk', 'no_sj', 'sj', 'listkode', 'total'));
    }

    public function store(Request $request)
    {
        $sj = new Suratjalan;
        $cs = Customer::find($request->customer);
        $pr = Produk::find($request->produk);

        $sj->no_sj = $request->no_sj;
        $sj->tanggal = date('Y-m-d');
        $sj->id_customer = $request->customer;
        $sj->customer = $cs->nama;
        $sj->alamat = $request->alamat;
        $sj->nomor_kendaraan = $request->nomor_kendaraan;
        $sj->id_produk = $request->produk;
        $sj->produk = $pr->produk;
        $sj->kemasan = $request->kemasan;
        $sj->harga = str_replace('.', '', $request->harga);
        $sj->jml_sak = $request->jml_sak;
        $sj->total_kg = $request->total_kg;
        $sj->status_cetak = 0;
        $sj->status = 0;
        $sj->save();

        return redirect()->route('suratjalan')->with('success', 'Data berhasil ditambah');
    }

    public function delete($id)
    {
        $d = Suratjalan::find($id);
        $d->delete();

        return redirect()->route('suratjalan');
    }

    public function simpan(Request $request)
    {
        $cek = Listsuratjalan::where('no_sj', $request->no_sj)->first();

        if ($cek) {
            return redirect()->route('suratjalan')->with('error', 'No Surat Jalan sudah terdaftar');
        }

        $firstItem = Suratjalan::where('no_sj', $request->no_sj)->first();

        $ls = new Listsuratjalan;
        $ls->no_sj = $request->no_sj;
        $ls->nomor_kendaraan = $firstItem->nomor_kendaraan ?? null;
        $ls->status_cetak = $request->status_cetak ?? 0;
        $ls->status = 0;
        $ls->tanggal = date('Y-m-d');
        $ls->id_user = session('id_user');
        $ls->cetak = 0;
        $ls->save();

        return redirect()->route('suratjalan')->with('success', 'Surat Jalan berhasil disimpan');
    }

    public function listsuratjalan()
    {
        $query = Listsuratjalan::orderBy('listsuratjalans.id', 'desc')
            ->leftJoin('suratjalans as sj', 'listsuratjalans.no_sj', '=', 'sj.no_sj')
            ->leftJoin('penggunas as pu', 'listsuratjalans.user_setujui', '=', 'pu.id')
            ->leftJoin('penggunas as pu2', 'listsuratjalans.id_user', '=', 'pu2.id')
            ->select(
                'listsuratjalans.*',
                'sj.customer as customer_nama',
                'pu.username as user_setujui_username',
                'pu2.username as pengguna_username',
                DB::raw('SUM(sj.total_kg) as total_kg')
            )
            ->groupBy('listsuratjalans.id', 'listsuratjalans.no_sj', 'listsuratjalans.nomor_kendaraan',
                'listsuratjalans.status_cetak', 'listsuratjalans.status', 'listsuratjalans.tanggal',
                'listsuratjalans.id_user', 'listsuratjalans.user_setujui', 'listsuratjalans.cetak',
                'listsuratjalans.created_at', 'listsuratjalans.updated_at',
                'sj.customer', 'pu.username', 'pu2.username');

        if (session('level') == 'staff') {
            $query->where('listsuratjalans.id_user', session('id_user'));
        }

        $list = $query->get();

        return Inertia::render('ListSuratJalan/Index', compact('list'));
    }

    public function detailsj($no_sj)
    {
        $sj = Suratjalan::where('no_sj', $no_sj)->with('produknew', 'customernew')->first();
        $list = Suratjalan::where('no_sj', $no_sj)->get();
        $total = Suratjalan::where('no_sj', $no_sj)->sum('total_kg');
        $ls = Listsuratjalan::where('no_sj', $no_sj)->with('userSetujui')->first();

        return Inertia::render('ListSuratJalan/Detail', compact('list', 'sj', 'total', 'ls'));
    }

    public function deletesj($id)
    {
        $dl = Suratjalan::find($id);
        $head = Listsuratjalan::where('no_sj', $dl->no_sj)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Surat Jalan sudah disetujui, tidak dapat dihapus');
        }

        $jml = Suratjalan::where('no_sj', $dl->no_sj)->count();
        if ($jml == 1) {
            Listsuratjalan::where('no_sj', $dl->no_sj)->delete();
        }

        $dl->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function deletesj2($id)
    {
        $dl = Listsuratjalan::find($id);
        if ($dl && $dl->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Surat Jalan sudah disetujui, tidak dapat dihapus');
        }
        $noSj = $dl->no_sj;
        $dl->delete();
        Suratjalan::where('no_sj', $noSj)->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function statusesj($no_sj)
    {
        $ls = Listsuratjalan::where('no_sj', $no_sj)->first();
        if ($ls->status == 0) {
            $ls->status = 1;
            $ls->user_setujui = session('id_user');
        } else {
            $ls->status = 0;
            $ls->user_setujui = session('id_user');
        }
        $ls->update();

        return redirect()->back()->with('success', 'Status surat jalan berhasil diupdate');
    }

    public function reviewSj($no_sj)
    {
        $cek = Listsuratjalan::where('no_sj', $no_sj)->with('userSetujui')->first();
        if ($cek->status_cetak == 0) {
            $ls = Listsuratjalan::find($cek->id);
            $ls->status_cetak = 1;
            $ls->update();
        }
        $nama_setujui = '';
        if ($cek->userSetujui) {
            $nama_setujui = ucwords(strtolower($cek->userSetujui->nama ?: $cek->userSetujui->username));
        }
        $inv = Suratjalan::where('no_sj', $no_sj)->get();
        $cs = Suratjalan::where('no_sj', $no_sj)->with('customernew')->first();
        $grand_total = Suratjalan::where('no_sj', $no_sj)->sum('total_kg');
        $cetak = $cek->cetak;

        return view('admin/review-sj', compact('inv', 'grand_total', 'cs', 'nama_setujui', 'cetak'));
    }

    public function edit($id)
    {
        $sj = Suratjalan::with('produknew', 'customernew')->where('id', $id)->first();
        $head = Listsuratjalan::where('no_sj', $sj->no_sj)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Surat Jalan sudah disetujui, tidak dapat diedit');
        }

        $customer = Customer::all();
        $produk = Produk::all();
        $list = Suratjalan::with('produknew', 'customernew')->where('no_sj', $sj->no_sj)->get();
        $total = $list->sum('total_kg');

        return Inertia::render('SuratJalan/Edit', compact('sj', 'customer', 'produk', 'list', 'total'));
    }

    public function update(Request $request, $id)
    {
        $sj = Suratjalan::find($id);
        $head = Listsuratjalan::where('no_sj', $sj->no_sj)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Surat Jalan sudah disetujui, tidak dapat diubah');
        }

        $cs = Customer::find($request->customer);
        $pr = Produk::find($request->produk);

        $sj->id_customer = $request->customer;
        $sj->customer = $cs->nama;
        $sj->alamat = $request->alamat;
        $sj->nomor_kendaraan = $request->nomor_kendaraan;
        $sj->id_produk = $request->produk;
        $sj->produk = $pr->produk;
        $sj->kemasan = $pr->kemasan;
        $sj->harga = str_replace('.', '', $request->harga);
        $sj->jml_sak = $request->jml_sak;
        $sj->total_kg = $pr->kemasan * $request->jml_sak;
        $sj->status_cetak = 0;
        $sj->update();

        $firstItem = Suratjalan::where('no_sj', $sj->no_sj)->first();
        Listsuratjalan::where('no_sj', $sj->no_sj)->update([
            'nomor_kendaraan' => $firstItem->nomor_kendaraan ?? null,
        ]);

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function reviewSjPreview($no_sj)
    {
        $inv = Suratjalan::where('no_sj', $no_sj)->get();
        $cs = Suratjalan::where('no_sj', $no_sj)->with('customernew')->first();
        $grand_total = Suratjalan::where('no_sj', $no_sj)->sum('total_kg');
        $cek = Listsuratjalan::where('no_sj', $no_sj)->with('userSetujui')->first();
        $nama_setujui = '';
        if ($cek && $cek->userSetujui) {
            $nama_setujui = ucwords(strtolower($cek->userSetujui->nama ?: $cek->userSetujui->username));
        }

        return view('admin/review-sj-preview', compact('inv', 'grand_total', 'cs', 'nama_setujui'));
    }

    public function cetakStatusSj($no_sj)
    {
        $ls = Listsuratjalan::where('no_sj', $no_sj)->first();
        if ($ls) {
            $ls->status_cetak = 1;
            if ($ls->cetak == null) {
                $ls->cetak = 0;
            } else {
                $ls->cetak = $ls->cetak + 1;
            }
            $ls->update();
        }

        return response()->json(['success' => true]);
    }
}
