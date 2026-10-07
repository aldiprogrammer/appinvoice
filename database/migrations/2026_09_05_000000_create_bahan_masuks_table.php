<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bahan_masuks', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->date('tanggal_sampai');
            $table->string('kode_bahan', 50);
            $table->string('jenis_bahan', 100);
            $table->string('kemasan', 30);
            $table->integer('jumlah_sak');
            $table->string('no_plat', 20);
            $table->string('status_kontainer', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bahan_masuks');
    }
};
