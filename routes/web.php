<?php

use App\Http\Controllers\admin\BahanController;
use App\Http\Controllers\admin\BahanMasukController;
use App\Http\Controllers\admin\CustomerController;
use App\Http\Controllers\admin\CustomerMappingController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\FollowupController;
use App\Http\Controllers\admin\InventarisController;
use App\Http\Controllers\admin\InvoiceController;
use App\Http\Controllers\admin\ListinvoiceController;
use App\Http\Controllers\admin\NotifikasiController;
use App\Http\Controllers\admin\OrderCustomerController;
use App\Http\Controllers\admin\PenggunaController;
use App\Http\Controllers\admin\ProdukController;
use App\Http\Controllers\admin\SuratjalanController;
use App\Http\Controllers\CronjobController;
use App\Http\Controllers\FollowupCustomerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PetaCustomerController;
use App\Http\Middleware\Ceklogin;
use Illuminate\Support\Facades\Route;

Route::get('/', [LoginController::class, 'index'])->name('menu');
Route::get('/login/{menu}', [LoginController::class, 'showLogin'])->name('login');
Route::post('/login', [LoginController::class, 'actlogin'])->name('login.auth');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/peta-customer', [PetaCustomerController::class, 'index'])->name('peta.customer');
Route::get('/follow-up-customer', [FollowupCustomerController::class, 'index'])->name('followupcustomer');

Route::get('/cronjob', [CronjobController::class, 'index'])->name('cronjob');

Route::middleware([Ceklogin::class])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/customer', [CustomerController::class, 'index'])->name('customer');
    Route::get('/customer/{id}', [CustomerController::class, 'detail'])->name('detail');
    Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store');
    Route::put('/customer/{id}', [CustomerController::class, 'update'])->name('customer.update');
    Route::delete('/customer/{id}', [CustomerController::class, 'delete'])->name('customer.delete');

    Route::get('/customer-mapping', [CustomerMappingController::class, 'index'])->name('customermapping');
    Route::post('/customer-mapping', [CustomerMappingController::class, 'store'])->name('customermapping.store');
    Route::put('/customer-mapping/{id}', [CustomerMappingController::class, 'update'])->name('customermapping.update');
    Route::delete('/customer-mapping/{id}', [CustomerMappingController::class, 'delete'])->name('customermapping.delete');

    Route::get('/ordercustomer', [OrderCustomerController::class, 'index'])->name('ordercustomer');
    Route::get('/ordercustomer/template', [OrderCustomerController::class, 'template'])->name('ordercustomer.template');
    Route::post('/ordercustomer', [OrderCustomerController::class, 'store'])->name('ordercustomer.store');
    Route::post('/ordercustomer/import', [OrderCustomerController::class, 'import'])->name('ordercustomer.import');
    Route::put('/ordercustomer/{id}', [OrderCustomerController::class, 'update'])->name('ordercustomer.update');
    Route::delete('/ordercustomer/all', [OrderCustomerController::class, 'deleteAll'])->name('ordercustomer.deleteAll');
    Route::delete('/ordercustomer/{id}', [OrderCustomerController::class, 'delete'])->name('ordercustomer.delete');

    Route::get('/produk', [ProdukController::class, 'index'])->name('produk');
    Route::get('/produk/{id}', [ProdukController::class, 'detail'])->name('detail');
    Route::post('/produk', [ProdukController::class, 'store'])->name('produk.store');
    Route::put('/produk/{id}', [ProdukController::class, 'update'])->name('produk.update');
    Route::delete('/produk/{id}', [ProdukController::class, 'delete'])->name('produk.delete');

    Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice');
    Route::post('/invoice', [InvoiceController::class, 'store'])->name('invoice.create');
    Route::delete('/invoice/{id}', [InvoiceController::class, 'delete'])->name('invoice.delete');

    route::get('/listinvoice', [ListinvoiceController::class, 'index'])->name('listinvoice');
    route::get('/listinvoice/{kode}', [ListinvoiceController::class, 'show'])->name('detaillistinvoice');
    route::get('/editinvoice/{id}', [ListinvoiceController::class, 'edit'])->name('editinvoice');
    route::post('/listinvoice', [ListinvoiceController::class, 'store'])->name('listinvoice.create');
    route::delete('/listinvoice/{id}', [ListinvoiceController::class, 'delete'])->name('listinvoice.delete');
    route::delete('/listinvoice2/{id}', [ListinvoiceController::class, 'delete2'])->name('listinvoice2.delete2');
    route::put('/updatelist/{id}', [ListinvoiceController::class, 'updatelist'])->name('updatelist.update');

    route::put('/listinvoice/{id}', [ListinvoiceController::class, 'update'])->name('listinvoice.update');

    route::get('/cetak/{kode}', [InvoiceController::class, 'cetak'])->name('cetak');
    route::get('/review/{kode}', [InvoiceController::class, 'review'])->name('review');

    route::post('/cetak-status/{kode}', [ListinvoiceController::class, 'updateCetakStatus'])->name('cetak.status');
    route::get('/review-preview/{kode}', [InvoiceController::class, 'reviewPreview'])->name('review.preview');

    route::get('/pengguna', [PenggunaController::class, 'index'])->name('pengguna');
    route::post('/pengguna', [PenggunaController::class, 'store'])->name('pengguna.create');
    route::put('/pengguna/{id}', [PenggunaController::class, 'update'])->name('pengguna.update');
    route::delete('/pengguna/{id}', [PenggunaController::class, 'delete'])->name('pengguna.delete');

    Route::get('/statusinvoice/{kode}', [ListinvoiceController::class, 'statusinvoice'])->name('statusinvoice');

    Route::get('/suratjalan', [SuratjalanController::class, 'index'])->name('suratjalan');
    Route::post('/suratjalan', [SuratjalanController::class, 'store'])->name('suratjalan.create');
    Route::delete('/suratjalan/{id}', [SuratjalanController::class, 'delete'])->name('suratjalan.delete');
    Route::post('/suratjalan-simpan', [SuratjalanController::class, 'simpan'])->name('suratjalan.simpan');
    Route::get('/suratjalan/edit/{id}', [SuratjalanController::class, 'edit'])->name('suratjalan.edit');
    Route::put('/suratjalan/{id}', [SuratjalanController::class, 'update'])->name('suratjalan.update');
    Route::get('/listsuratjalan', [SuratjalanController::class, 'listsuratjalan'])->name('listsuratjalan');
    Route::get('/listsuratjalan/{no_sj}', [SuratjalanController::class, 'detailsj'])->name('detailsuratjalan');
    Route::delete('/listsuratjalan/{id}', [SuratjalanController::class, 'deletesj'])->name('listsuratjalan.delete');
    Route::delete('/listsuratjalan2/{id}', [SuratjalanController::class, 'deletesj2'])->name('listsuratjalan2.delete2');
    Route::get('/statusesj/{no_sj}', [SuratjalanController::class, 'statusesj'])->name('statusesj');
    Route::get('/review-sj/{no_sj}', [SuratjalanController::class, 'reviewSj'])->name('review.sj');
    Route::get('/review-preview-sj/{no_sj}', [SuratjalanController::class, 'reviewSjPreview'])->name('review.sj.preview');
    Route::post('/cetak-status-sj/{no_sj}', [SuratjalanController::class, 'cetakStatusSj'])->name('cetak.status.sj');

    Route::get('/bahanmasuk', [BahanMasukController::class, 'index'])->name('bahanmasuk');
    Route::post('/bahanmasuk', [BahanMasukController::class, 'store'])->name('bahanmasuk.store');
    Route::put('/bahanmasuk/{id}', [BahanMasukController::class, 'update'])->name('bahanmasuk.update');
    Route::delete('/bahanmasuk/{id}', [BahanMasukController::class, 'delete'])->name('bahanmasuk.delete');

    Route::get('/bahan', [BahanController::class, 'index'])->name('bahan');

    Route::get('/followup', [FollowupController::class, 'index'])->name('followup');
    Route::post('/followup', [FollowupController::class, 'store'])->name('followup.store');
    Route::get('/daftar-followup', [OrderCustomerController::class, 'followupList'])->name('followup.list');

    Route::get('/kirim-notifikasi', [NotifikasiController::class, 'index'])->name('kirimnotifikasi');
    Route::post('/kirim-notifikasi', [NotifikasiController::class, 'send'])->name('kirimnotifikasi.send');

    Route::get('/inventaris', [InventarisController::class, 'index'])->name('inventaris');
    Route::get('/inventaris/cetak-label', [InventarisController::class, 'label'])->name('inventaris.label');
    Route::post('/inventaris', [InventarisController::class, 'store'])->name('inventaris.store');
    Route::put('/inventaris/{id}', [InventarisController::class, 'update'])->name('inventaris.update');
    Route::delete('/inventaris/{id}', [InventarisController::class, 'delete'])->name('inventaris.delete');
});
