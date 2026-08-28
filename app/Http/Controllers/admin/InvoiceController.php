<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\kode;
use App\Models\Listinvoice;
use App\Models\Produk;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $cek = Listinvoice::first();
        if ($cek == true) {
            $last = Listinvoice::orderBy('id', 'desc')->first();
            $kode = $last->kode + 1;
        } else {
            $kd = kode::first();
            $kode = $kd->kode + 1;
        }

        $customer = Customer::all();
        $produk = Produk::all();
        $invoice = Invoice::with('customernew', 'produknew')->where('kode', $kode)->get();
        $listkode = Invoice::where('kode', $kode)->with('customernew')->first();
        $total = Invoice::where('kode', $kode)->sum('total_harga');
        $total_tambahan = Invoice::where('kode', $kode)->sum('total_harga_tambahan');

        $bulan = $this->bulanromawi(date('m'));
        $tahun = date('Y');

        return Inertia::render('Invoice/Create', compact('customer', 'produk', 'kode', 'invoice', 'listkode', 'total', 'total_tambahan', 'bulan', 'tahun'));
    }

    public function store(Request $request)
    {
        $in = new Invoice;
        $cs = Customer::find($request->customer);
        $pr = Produk::find($request->produk);
        $in->kode = $request->kode;
        $in->kode_invoice = $request->kode_invoice;
        $in->no_po = $request->no_po;
        $in->tanggal = date('Y-m-d');
        $in->id_customer = $request->customer;
        $in->customer = $cs->nama;
        $in->produk = $pr->produk;
        $in->id_produk = $request->produk;
        $in->kemasan = $pr->kemasan;
        $in->jml_sak = $request->jml_sak;
        $in->harga = str_replace('.', '', $request->harga);
        $total = str_replace('.', '', $request->harga) * $request->jml_sak;
        $total_harga = $total * $pr->kemasan;
        $in->total_harga = $total_harga;
        $in->harga_tambahan = $request->harga_tambahan;

        $totalHT = $request->harga_tambahan * $request->jml_sak;

        $in->total_harga_tambahan = $totalHT;
        $in->status_cetak = 0;
        $in->id_user = session('id_user');
        $in->save();

        return redirect()->route('invoice')->with('success', 'Data berhasil ditambah');
    }

    public function delete($id)
    {
        $d = Invoice::find($id);
        $d->delete();

        return redirect()->route('invoice');
    }

    public function cetak($kode)
    {
        $inv = Invoice::where('kode', $kode)->get();
        $cs = Invoice::where('kode', $kode)->with('produknew', 'customernew')->first();
        $grand_total = Invoice::where('kode', $kode)->sum('total_harga');
        $total_tambahan = Invoice::where('kode', $kode)->sum('total_harga_tambahan');
        $pdf = Pdf::loadView('admin/cetak', compact('inv', 'grand_total', 'cs', 'total_tambahan'))
            ->setPaper([0, 0, 595, 397], 'portrait');

        return $pdf->stream('invoice.pdf');
    }

    public function bulanromawi($bulan)
    {
        $romawi = [
            '01' => 'I', '02' => 'II', '03' => 'III', '04' => 'IV',
            '05' => 'V', '06' => 'VI', '07' => 'VII', '08' => 'VIII',
            '09' => 'IX', '10' => 'X', '11' => 'XI', '12' => 'XII',
        ];

        return $romawi[$bulan];
    }

    public function reviewPreview($kode)
    {
        $inv = Invoice::where('kode', $kode)->get();
        $cs = Invoice::where('kode', $kode)->with('produknew', 'customernew')->first();
        $grand_total = Invoice::where('kode', $kode)->sum('total_harga');
        $total_tambahan = Invoice::where('kode', $kode)->sum('total_harga_tambahan');
        $cek = Listinvoice::where('kode', $kode)->with('userSetujui')->first();
        $nama_setujui = '';
        if ($cek && $cek->userSetujui) {
            $nama_setujui = ucwords(strtolower($cek->userSetujui->nama ?: $cek->userSetujui->username));
        }

        return view('admin/review-preview', compact('inv', 'grand_total', 'cs', 'total_tambahan', 'nama_setujui'));
    }

    public function review($kode)
    {
        $cek = Listinvoice::where('kode', $kode)->with('userSetujui')->first();
        if ($cek->status_cetak == 0) {
            $ls = Listinvoice::find($cek->id);
            $ls->status_cetak = 1;
            $ls->update();
        }
        $nama_setujui = '';
        if ($cek->userSetujui) {
            $nama_setujui = ucwords(strtolower($cek->userSetujui->nama ?: $cek->userSetujui->username));
        }
        $inv = Invoice::where('kode', $kode)->get();
        $cs = Invoice::where('kode', $kode)->with('produknew', 'customernew')->first();
        $grand_total = Invoice::where('kode', $kode)->sum('total_harga');
        $total_tambahan = Invoice::where('kode', $kode)->sum('total_harga_tambahan');

        $cetak = $cek->cetak;

        return view('admin/review', compact('inv', 'grand_total', 'cs', 'total_tambahan', 'nama_setujui', 'cetak'));
    }
}
