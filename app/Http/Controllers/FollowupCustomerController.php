<?php

namespace App\Http\Controllers;

use App\Models\Ordercustomer;
use App\Services\FollowupService;
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
}
