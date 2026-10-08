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
        Schema::create('ordercustomers', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 30);
            $table->string('nama_customer', 100);
            $table->string('no_bon', 50);
            $table->string('no_sj', 50);
            $table->string('kode_item', 50);
            $table->string('barang', 100);
            $table->string('gudang', 50);
            $table->string('zak', 30);
            $table->string('kg', 30);
            $table->string('total_kg', 30);
            $table->string('harga', 30);
            $table->string('tambahan_harga_beras', 30);
            $table->string('jumlah', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordercustomers');
    }
};
