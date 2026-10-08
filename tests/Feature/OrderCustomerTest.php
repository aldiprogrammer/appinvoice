<?php

namespace Tests\Feature;

use App\Models\Ordercustomer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Tests\TestCase;

class OrderCustomerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_requires_login(): void
    {
        $this->get('/ordercustomer')->assertRedirect('/');
    }

    public function test_store_update_and_delete(): void
    {
        $payload = [
            'tanggal' => '2026-10-08',
            'nama_customer' => 'TOKO UJI',
            'no_bon' => 'NB-001',
            'no_sj' => 'SJ-001',
            'kode_item' => 'PRT-01',
            'barang' => 'BERAS 5 KG',
            'gudang' => 'GUDANG 1',
            'zak' => '10',
            'kg' => '50',
            'total_kg' => '500',
            'harga' => '65000',
            'tambahan_harga_beras' => '0',
            'jumlah' => '3250000',
        ];

        $this->withSession(['username' => 'admin'])
            ->post('/ordercustomer', $payload)
            ->assertRedirect(route('ordercustomer'));

        $this->assertDatabaseHas('ordercustomers', ['nama_customer' => 'TOKO UJI']);

        $order = Ordercustomer::first();

        $this->withSession(['username' => 'admin'])
            ->put('/ordercustomer/'.$order->id, ['tanggal' => '2026-10-09'] + $payload)
            ->assertRedirect(route('ordercustomer'));

        $this->assertDatabaseHas('ordercustomers', ['id' => $order->id, 'tanggal' => '2026-10-09']);

        $this->withSession(['username' => 'admin'])
            ->delete('/ordercustomer/'.$order->id)
            ->assertRedirect(route('ordercustomer'));

        $this->assertDatabaseMissing('ordercustomers', ['id' => $order->id]);
    }

    public function test_store_requires_customer_name(): void
    {
        $response = $this->withSession(['username' => 'admin'])
            ->from('/ordercustomer')
            ->post('/ordercustomer', ['tanggal' => '2026-10-08', 'kode_item' => 'PRT-01', 'barang' => 'BERAS']);

        $response->assertSessionHasErrors('nama_customer');
        $this->assertSame(0, Ordercustomer::count());
    }

    public function test_import_excel_file(): void
    {
        $file = UploadedFile::fake()->createWithContent('order-customer.xlsx', $this->xlsxContent());

        $this->withSession(['username' => 'admin'])
            ->post('/ordercustomer/import', ['file' => $file])
            ->assertRedirect(route('ordercustomer'));

        $this->assertDatabaseHas('ordercustomers', ['nama_customer' => 'TOKO UJI', 'jumlah' => '3250000']);
        $this->assertDatabaseMissing('ordercustomers', ['nama_customer' => 'TOKO KOSONG']);
        $this->assertSame(1, Ordercustomer::count());
    }

    public function test_import_rejects_invalid_file_extension(): void
    {
        $file = UploadedFile::fake()->createWithContent('order.txt', 'bukan excel');

        $response = $this->withSession(['username' => 'admin'])
            ->post('/ordercustomer/import', ['file' => $file]);

        $response->assertSessionHasErrors('file');
        $this->assertSame(0, Ordercustomer::count());
    }

    public function test_template_can_be_downloaded(): void
    {
        $this->withSession(['username' => 'admin'])
            ->get('/ordercustomer/template')
            ->assertOk()
            ->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    private function xlsxContent(): string
    {
        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->fromArray([
            'Tanggal', 'Nama Customer', 'No Bon', 'No SJ', 'Kode Item', 'Barang', 'Gudang',
            'Zak', 'Kg', 'Total Kg', 'Harga', 'Tambahan Harga Beras', 'Jumlah',
        ], null, 'A1');

        $sheet->fromArray([
            ['2026-10-08', 'TOKO UJI', 'NB-001', 'SJ-001', 'PRT-01', 'BERAS 5 KG', 'GUDANG 1', '10', '50', '500', '65000', '0', '3250000'],
        ], null, 'A2');

        // Tanpa tanggal, baris ini harus dilewati.
        $sheet->fromArray([
            ['', 'TOKO KOSONG', 'NB-002', 'SJ-002', 'PRT-02', 'BERAS 10 KG', 'GUDANG 1', '5', '50', '250', '125000', '0', '6250000'],
        ], null, 'A3');

        ob_start();
        (new Xlsx($spreadsheet))->save('php://output');
        $content = ob_get_clean();
        $spreadsheet->disconnectWorksheets();

        return $content;
    }
}
