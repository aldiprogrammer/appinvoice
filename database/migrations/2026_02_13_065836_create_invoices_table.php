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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 30);
            $table->string('kode_invoice', 30);
            $table->string('no_po', 100);
            $table->string('tanggal', 15);
            $table->string('id_customer');
            $table->string('customer');
            $table->string('produk', 35);
            $table->string('id_produk', 35);
            $table->string('kemasan', 15);
            $table->string('jml_sak', 15);
            $table->string('harga', 50);
            $table->string('total_harga', 50);
            $table->string('status_cetak', 5);
            $table->string('id_user', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
