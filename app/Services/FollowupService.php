<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Followup;
use App\Models\Ordercustomer;
use Illuminate\Support\Carbon;
use Throwable;

class FollowupService
{
    /**
     * Baca konfigurasi follow-up (tabel `followups`).
     *
     * @return array{waktu: int, status: string}
     */
    public function config(): array
    {
        $config = Followup::first();

        return [
            'waktu' => (int) ($config->waktu ?? 0),
            'status' => $config->status ?? 'Tidak Aktif',
        ];
    }

    /**
     * Susun daftar customer yang order terakhirnya sudah melewati waktu follow-up.
     *
     * @return array<int, array<string, mixed>>
     */
    public function list(?int $waktu = null): array
    {
        if ($waktu === null) {
            $waktu = $this->config()['waktu'];
        }

        $customers = Customer::get(['nama', 'nohp', 'alamat'])
            ->keyBy(fn ($c) => mb_strtolower(trim((string) $c->nama)));

        $orders = Ordercustomer::get();

        $grouped = [];

        foreach ($orders as $order) {
            $nama = trim((string) $order->nama_customer);

            if ($nama === '') {
                continue;
            }

            $date = $this->parseDate($order->tanggal);

            if ($date === null) {
                continue;
            }

            $key = mb_strtolower($nama);

            if (! isset($grouped[$key])) {
                $grouped[$key] = [
                    'nama' => $nama,
                    'last_date' => $date,
                    'last_tanggal' => $order->tanggal,
                    'last_barang' => $order->barang,
                    'last_no_bon' => $order->no_bon,
                    'last_no_sj' => $order->no_sj,
                    'total_orders' => 0,
                    'orders' => [],
                ];
            }

            $grouped[$key]['total_orders']++;

            $grouped[$key]['orders'][] = [
                'tanggal' => $order->tanggal,
                'no_bon' => $order->no_bon,
                'no_sj' => $order->no_sj,
                'kode_item' => $order->kode_item,
                'barang' => $order->barang,
                'gudang' => $order->gudang,
                'zak' => $order->zak,
                'kg' => $order->kg,
                'total_kg' => $order->total_kg,
                'harga' => $order->harga,
                'tambahan_harga_beras' => $order->tambahan_harga_beras,
                'jumlah' => $order->jumlah,
                '_date' => $date->getTimestamp(),
            ];

            if ($date->greaterThanOrEqualTo($grouped[$key]['last_date'])) {
                $grouped[$key]['last_date'] = $date;
                $grouped[$key]['last_tanggal'] = $order->tanggal;
                $grouped[$key]['last_barang'] = $order->barang;
                $grouped[$key]['last_no_bon'] = $order->no_bon;
                $grouped[$key]['last_no_sj'] = $order->no_sj;
            }
        }

        $today = Carbon::today();
        $list = [];

        foreach ($grouped as $group) {
            $lastDay = $group['last_date']->copy()->startOfDay();
            $daysSince = (int) round(($today->getTimestamp() - $lastDay->getTimestamp()) / 86400);

            if ($daysSince < $waktu) {
                continue;
            }

            $customer = $customers->get(mb_strtolower($group['nama']));

            $customerOrders = $group['orders'];
            usort($customerOrders, fn ($a, $b) => $b['_date'] <=> $a['_date']);
            $customerOrders = array_map(function ($o) {
                unset($o['_date']);

                return $o;
            }, $customerOrders);

            $list[] = [
                'nama_customer' => $group['nama'],
                'last_tanggal' => $group['last_tanggal'],
                'last_barang' => $group['last_barang'],
                'last_no_bon' => $group['last_no_bon'],
                'last_no_sj' => $group['last_no_sj'],
                'total_orders' => $group['total_orders'],
                'days_since' => $daysSince,
                'nohp' => $customer->nohp ?? null,
                'alamat' => $customer->alamat ?? null,
                'orders' => $customerOrders,
            ];
        }

        usort($list, fn ($a, $b) => $b['days_since'] <=> $a['days_since']);

        return $list;
    }

    private function parseDate($value): ?Carbon
    {
        $value = trim((string) $value);

        if ($value === '') {
            return null;
        }

        foreach (['Y-m-d', 'd/m/Y', 'd-m-Y', 'Y/m/d'] as $format) {
            try {
                $date = Carbon::createFromFormat($format, $value);

                if ($date && $date->format($format) === $value) {
                    return $date->startOfDay();
                }
            } catch (Throwable $e) {
                // lanjut ke format berikutnya
            }
        }

        try {
            return Carbon::parse($value)->startOfDay();
        } catch (Throwable $e) {
            return null;
        }
    }
}
