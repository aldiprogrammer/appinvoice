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
        Schema::create('listinvoices', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 50);
            $table->string('kode_invoice', 50);
            $table->string('kode_po', 50);
            $table->string('status_cetak', 11);
            $table->string('id_user', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listinvoices');
    }
};
