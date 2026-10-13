<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Ordercustomer;
use App\Services\FollowupService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FollowupCustomerController extends Controller
{
    public function index(FollowupService $followup)
    {
        $config = $followup->config();

        return Inertia::render('FollowupCustomer/Index', [
            'jmlOrder' => Ordercustomer::count(),
            'followups' => $followup->list($config['waktu']),
            'orders' => Ordercustomer::orderBy('id', 'desc')->get([
                'id', 'tanggal', 'nama_customer', 'no_bon', 'no_sj', 'kode_item',
                'barang', 'gudang', 'zak', 'kg', 'total_kg', 'harga', 'jumlah',
            ]),
            'waktu' => $config['waktu'],
            'status' => $config['status'],
        ]);
    }

    public function updateNohp(Request $request, $id)
    {
        $request->validate([
            'nohp' => ['required', 'string', 'max:20', 'regex:/^[0-9+\- ()]+$/'],
        ]);

        $customer = Customer::find($id);

        if (! $customer) {
            return back()->with('error', 'Data customer tidak ditemukan');
        }

        $customer->update(['nohp' => $request->nohp]);

        return back()->with('success', 'Nomor HP customer berhasil diperbarui');
    }

    public function storeCustomer(Request $request)
    {
        $request->validate([
            'customer_id' => ['nullable', 'integer'],
            'nama' => ['required', 'string', 'max:100'],
            'singkatan' => ['required', 'string', 'max:30'],
            'nohp' => ['required', 'string', 'max:20', 'regex:/^[0-9+\- ()]+$/'],
            'alamat' => ['nullable', 'string', 'max:255'],
        ]);

        $customer = $request->filled('customer_id') ? Customer::find($request->customer_id) : null;

        if ($customer) {
            $customer->update($request->only('nama', 'singkatan', 'nohp', 'alamat'));
            $pesan = 'Nomor HP customer berhasil diisi';
        } else {
            Customer::create($request->only('nama', 'singkatan', 'nohp', 'alamat'));
            $pesan = 'Customer baru berhasil ditambahkan';
        }

        return back()->with('success', $pesan);
    }
}
