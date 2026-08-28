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
        Schema::create('suratjalans', function (Blueprint $table) {
            $table->id();
            $table->string('no_sj', 50);
            $table->string('tanggal', 30);
            $table->string('id_customer', 11);
            $table->string('customer', 50);
            $table->string('id_produk', 11);
            $table->string('produk', 50);
            $table->string('kemasan', 30);
            $table->string('jml_sak', 40);
            $table->string('status_cetak', 11);
            $table->string('status', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suratjalans');
    }
};
