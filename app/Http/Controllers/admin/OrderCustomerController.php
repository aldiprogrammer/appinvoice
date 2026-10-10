<?php

namespace App\Http\Controllers\admin;

use App\Exports\OrderCustomerTemplate;
use App\Http\Controllers\Controller;
use App\Imports\OrderCustomerImport;
use App\Models\Ordercustomer;
use App\Services\FollowupService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class OrderCustomerController extends Controller
{
    public function index()
    {
        $orders = Ordercustomer::orderBy('id', 'desc')->get();

        return Inertia::render('OrderCustomer/Index', compact('orders'));
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        Ordercustomer::create($data);

        return redirect()->route('ordercustomer')->with('success', 'Data order customer berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $order = Ordercustomer::find($id);

        if (! $order) {
            return redirect()->route('ordercustomer')->with('error', 'Data tidak ditemukan');
        }

        $order->update($this->validated($request));

        return redirect()->route('ordercustomer')->with('success', 'Data order customer berhasil diubah');
    }

    public function delete($id)
    {
        $order = Ordercustomer::find($id);

        if (! $order) {
            return redirect()->route('ordercustomer')->with('error', 'Data tidak ditemukan');
        }

        $order->delete();

        return redirect()->route('ordercustomer')->with('success', 'Data order customer berhasil dihapus');
    }

    public function deleteAll()
    {
        $count = Ordercustomer::count();

        if ($count === 0) {
            return redirect()->route('ordercustomer')->with('error', 'Tidak ada data untuk dihapus');
        }

        Ordercustomer::query()->delete();

        return redirect()->route('ordercustomer')->with('success', $count.' data order customer berhasil dihapus');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'extensions:xlsx,xls,csv', 'max:10240'],
        ]);

        $import = new OrderCustomerImport;

        try {
            Excel::import($import, $request->file('file'));
        } catch (Throwable $e) {
            return redirect()->route('ordercustomer')->with('error', 'Import gagal: '.$e->getMessage());
        }

        $response = redirect()->route('ordercustomer');

        if ($import->saved > 0) {
            $response->with('success', $import->saved.' data berhasil diimport');
        }

        if ($import->skipped !== []) {
            $detail = implode(', ', array_slice($import->skipped, 0, 5));
            if (count($import->skipped) > 5) {
                $detail .= ', dan '.(count($import->skipped) - 5).' baris lainnya';
            }
            $response->with('error', count($import->skipped).' baris dilewati karena data tidak lengkap ('.$detail.')');
        }

        if ($import->saved === 0 && $import->skipped === []) {
            $response->with('error', 'Tidak ada data pada file');
        }

        return $response;
    }

    public function template()
    {
        return Excel::download(new OrderCustomerTemplate, 'template-order-customer.xlsx');
    }

    public function followupList(FollowupService $followup)
    {
        $config = $followup->config();

        return Inertia::render('FollowupList/Index', [
            'customers' => $followup->list($config['waktu']),
            'waktu' => $config['waktu'],
            'status' => $config['status'],
        ]);
    }

    private function validated(Request $request): array
    {
        $fields = [
            'tanggal' => ['required', 'string', 'max:30'],
            'nama_customer' => ['required', 'string', 'max:100'],
            'no_bon' => ['nullable', 'string', 'max:50'],
            'no_sj' => ['nullable', 'string', 'max:50'],
            'kode_item' => ['required', 'string', 'max:50'],
            'barang' => ['required', 'string', 'max:100'],
            'gudang' => ['nullable', 'string', 'max:50'],
            'zak' => ['nullable', 'string', 'max:30'],
            'kg' => ['nullable', 'string', 'max:30'],
            'total_kg' => ['nullable', 'string', 'max:30'],
            'harga' => ['nullable', 'string', 'max:30'],
            'tambahan_harga_beras' => ['nullable', 'string', 'max:30'],
            'jumlah' => ['nullable', 'string', 'max:30'],
        ];

        return $request->validate($fields) + array_fill_keys(
            ['no_bon', 'no_sj', 'gudang', 'zak', 'kg', 'total_kg', 'harga', 'tambahan_harga_beras', 'jumlah'],
            ''
        );
    }
}
