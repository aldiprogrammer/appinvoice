<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\FollowupLog;
use App\Models\Ordercustomer;
use App\Services\FollowupService;
use Carbon\Carbon;
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
            'sudahFollowups' => $followup->followedUpList(),
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

    public function markFollowedUp(Request $request)
    {
        $request->validate([
            'customer_name' => ['required', 'string', 'max:150'],
            'last_tanggal' => ['required', 'string', 'max:30'],
            'last_no_bon' => ['nullable', 'string', 'max:50'],
            'last_no_sj' => ['nullable', 'string', 'max:50'],
        ]);

        FollowupLog::updateOrCreate(
            [
                'customer_name' => trim((string) $request->customer_name),
                'last_tanggal' => $request->last_tanggal,
            ],
            [
                'last_no_bon' => $request->last_no_bon,
                'last_no_sj' => $request->last_no_sj,
                'followed_up_at' => Carbon::now(),
            ]
        );

        return back()->with('success', 'Customer berhasil ditandai sudah di-follow-up');
    }

    public function followedUp(FollowupService $followup)
    {
        return Inertia::render('FollowupCustomer/SudahFollowup', [
            'followups' => $followup->followedUpList(),
        ]);
    }

    public function undoFollowedUp($id)
    {
        $log = FollowupLog::find($id);

        if (! $log) {
            return back()->with('error', 'Data follow-up tidak ditemukan');
        }

        $log->delete();

        return back()->with('success', 'Customer dikembalikan ke daftar follow-up');
    }
}
