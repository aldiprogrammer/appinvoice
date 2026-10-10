<?php

use App\Http\Controllers\admin\NotifikasiController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/*
|--------------------------------------------------------------------------
| Notifikasi Follow-up Otomatis
|--------------------------------------------------------------------------
| Mengirim notifikasi follow-up customer setiap hari pukul 06:00 WIB.
| (App timezone masih UTC, jadi dipaksa ke Asia/Jakarta agar tepat jam 6 pagi.)
| Judul & pesan masih default, nanti bisa diubah sesuai kebutuhan.
*/
Schedule::call(function () {
    app(NotifikasiController::class)->send(Request::create('/kirim-notifikasi', 'POST', [
        'judul' => 'Pengingat Follow-up Customer',
        'pesan' => 'Jangan lupa follow-up customer yang belum melakukan order.',
    ]));
})
    ->name('notifikasi-followup-harian')
    ->timezone('Asia/Jakarta')
    ->dailyAt('06:00');
