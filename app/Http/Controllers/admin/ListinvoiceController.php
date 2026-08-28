<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Listinvoice;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListinvoiceController extends Controller
{
    public function index()
    {
        if (session('level') == 'staff') {
            $list = Listinvoice::orderBy('listinvoices.id', 'desc')
                ->with('inv', 'user')
                ->leftJoin('penggunas as pu', 'listinvoices.user_setujui', '=', 'pu.id')
                ->select('listinvoices.*', 'pu.username as user_setujui_username')
                ->where('listinvoices.id_user', session('id_user'))
                ->get();
        } else {
            $list = Listinvoice::orderBy('listinvoices.id', 'desc')
                ->with('inv', 'user')
                ->leftJoin('penggunas as pu', 'listinvoices.user_setujui', '=', 'pu.id')
                ->select('listinvoices.*', 'pu.username as user_setujui_username')
                ->get();
        }

        return Inertia::render('ListInvoice/Index', compact('list'));
    }

    public function show($kode)
    {
        $inv = Invoice::where('kode', $kode)->first();
        $list = Invoice::where('kode', $kode)->get();
        $total = Invoice::where('kode', $kode)->sum('total_harga');
        $total_tambahan = Invoice::where('kode', $kode)->sum('total_harga_tambahan');

        $cs = Invoice::where('kode', $kode)->with('produknew', 'customernew')->first();
        $ls = Listinvoice::where('kode', $kode)->with('userSetujui')->first();

        return Inertia::render('ListInvoice/Detail', compact('list', 'inv', 'total', 'cs', 'ls', 'total_tambahan'));
    }

    public function store(Request $request)
    {
        $cek = Listinvoice::where('kode_invoice', $request->kode_invoice)->first();

        if ($cek) {
            return redirect()->route('invoice')->with('error', 'Kode invoice sudah terdaftar');
        } else {
            $ls = new Listinvoice;
            $ls->kode = $request->kode;
            $ls->kode_invoice = $request->kode_invoice;
            $ls->no_po = $request->no_po;
            $ls->status_cetak = $request->status_cetak;
            $ls->tanggal = date('Y-m-d');
            $ls->id_user = session('id_user');
            $ls->save();

            $request->session()->forget('kode');

            if ($request->status_cetak == 1) {
                $kode = $request->kode;

                return redirect()->route('review', ['kode' => $kode])
                    ->with('cetak_url', route('review', ['kode' => $kode]));
            } else {
                return redirect()->route('invoice')->with('success', 'Invoice berhasil disimpan');
            }
        }
    }

    public function delete($id)
    {
        $dl = Invoice::find($id);
        $head = Listinvoice::where('kode_invoice', $dl->kode_invoice)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Invoice sudah disetujui, tidak dapat dihapus');
        }

        $jml = Invoice::where('kode_invoice', $dl->kode_invoice)->count();
        if ($jml == 1) {
            $delet = Listinvoice::where('kode', $dl->kode_invoice)->delete();
        }

        $dl->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function delete2($id)
    {
        $dl = Listinvoice::find($id);
        if ($dl && $dl->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Invoice sudah disetujui, tidak dapat dihapus');
        }
        $kodeInvoice = $dl->kode_invoice;
        $dl->delete();
        Invoice::where('kode_invoice', $kodeInvoice)->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    public function edit($id)
    {
        $ls = Invoice::with('produknew', 'customernew')->where('id', $id)->first();
        $head = Listinvoice::where('kode_invoice', $ls->kode_invoice)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Invoice sudah disetujui, tidak dapat diubah');
        }
        $customer = Customer::all();
        $produk = Produk::all();
        $list = Invoice::with('produknew', 'customernew')->where('kode_invoice', $ls->kode_invoice)->get();
        $total = $list->sum('total_harga');

        return Inertia::render('ListInvoice/Edit', compact('ls', 'customer', 'produk', 'list', 'total'));
    }

    public function update(Request $request, $id)
    {
        $in = Invoice::find($id);
        $head = Listinvoice::where('kode_invoice', $in->kode_invoice)->first();
        if ($head && $head->status == 1 && session('level') != 'super admin') {
            return redirect()->back()->with('error', 'Invoice sudah disetujui, tidak dapat diubah');
        }
        $cs = Customer::find($request->customer);
        $pr = Produk::find($request->produk);
        $in->kode_invoice = $request->kode_invoice;
        $in->no_po = $request->no_po;
        $in->id_customer = $request->customer;
        $in->customer = $cs->nama;
        $in->produk = $pr->produk;
        $in->id_produk = $request->produk;
        $in->kemasan = $pr->kemasan;
        $in->jml_sak = $request->jml_sak;
        $in->harga = str_replace('.', '', $request->harga);
        $total = str_replace('.', '', $request->harga) * $request->jml_sak;
        $total_harga = $total * $pr->kemasan;
        $in->harga_tambahan = $request->harga_tambahan;

        $totalHT = $request->harga_tambahan * $request->jml_sak;

        $in->total_harga_tambahan = $totalHT;

        $in->total_harga = $total_harga;
        $in->status_cetak = 0;

        $in->update();

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    public function updatelist($id)
    {
        $inv = Invoice::find($id);
        $kodeinv = $inv->kode_invoice;
        $kode = $inv->kode;
        $ls = Listinvoice::where('kode_invoice', $kodeinv)->first();
        $ls->status_cetak = '1';
        $ls->update();

        return redirect()->route('invoice')
            ->with('cetak_url', route('cetak', $kode));
    }

    public function statusinvoice($kode)
    {
        $ls = Listinvoice::where('kode', $kode)->first();
        if ($ls->status == 0) {
            $ls->status = 1;
            $ls->user_setujui = session('id_user');
        } else {
            $ls->status = 0;
            $ls->user_setujui = session('id_user');
        }
        $ls->update();

        return redirect()->back()->with('success', 'Status invoice berhasil diupdate');
    }

    public function updateCetakStatus($kode)
    {
        $ls = Listinvoice::where('kode', $kode)->first();
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
