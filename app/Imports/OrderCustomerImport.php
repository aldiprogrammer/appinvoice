<?php

namespace App\Imports;

use App\Models\Ordercustomer;
use DateTimeInterface;
use Maatwebsite\Excel\Concerns\RemembersRowNumber;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class OrderCustomerImport implements SkipsEmptyRows, ToModel, WithHeadingRow
{
    use RemembersRowNumber;

    /**
     * Kolom pada tabel ordercustomers, sesuai urutan header file excel.
     */
    public const COLUMNS = [
        'tanggal',
        'nama_customer',
        'no_bon',
        'no_sj',
        'kode_item',
        'barang',
        'gudang',
        'zak',
        'kg',
        'total_kg',
        'harga',
        'tambahan_harga_beras',
        'jumlah',
    ];

    private const REQUIRED = ['tanggal', 'nama_customer', 'kode_item', 'barang'];

    /**
     * Jumlah baris yang berhasil disimpan.
     */
    public int $saved = 0;

    /**
     * Pesan baris yang dilewati beserta alasannya.
     *
     * @var string[]
     */
    public array $skipped = [];

    public function model(array $row): ?Ordercustomer
    {
        $data = [];
        foreach (self::COLUMNS as $column) {
            $data[$column] = $this->normalize($column, $row[$column] ?? null);
        }

        $missing = [];
        foreach (self::REQUIRED as $column) {
            if ($data[$column] === '') {
                $missing[] = $column;
            }
        }

        if ($missing !== []) {
            $this->skipped[] = 'Baris '.$this->getRowNumber().': kolom '.implode(', ', $missing).' kosong';

            return null;
        }

        $this->saved++;

        return new Ordercustomer($data);
    }

    private function normalize(string $column, mixed $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        if ($value instanceof DateTimeInterface) {
            return $value->format('Y-m-d');
        }

        if (is_bool($value)) {
            return $value ? '1' : '';
        }

        if (is_int($value) || is_float($value)) {
            if ($column === 'tanggal' && $value > 20000 && $value < 60000) {
                try {
                    return ExcelDate::excelToDateTimeObject($value)->format('Y-m-d');
                } catch (\Throwable) {
                    return (string) $value;
                }
            }

            return (float) $value === floor((float) $value)
                ? (string) (int) $value
                : (string) $value;
        }

        return trim((string) $value);
    }
}
