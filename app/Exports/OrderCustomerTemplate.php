<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class OrderCustomerTemplate implements FromArray, WithHeadings, WithStyles
{
    public function headings(): array
    {
        return [
            'Tanggal',
            'Nama Customer',
            'No Bon',
            'No SJ',
            'Kode Item',
            'Barang',
            'Gudang',
            'Zak',
            'Kg',
            'Total Kg',
            'Harga',
            'Tambahan Harga Beras',
            'Jumlah',
        ];
    }

    public function array(): array
    {
        return [
            ['2026-10-08', 'CONTOH CUSTOMER', 'NB-001', 'SJ-001', 'PRT-01', 'BERAS 5 KG', 'GUDANG 1', '10', '50', '500', '65000', '0', '3250000'],
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
