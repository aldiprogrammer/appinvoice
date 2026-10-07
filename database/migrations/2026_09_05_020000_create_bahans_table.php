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
        Schema::create('bahans', function (Blueprint $table) {
            $table->id();
            $table->string('id_bahan', 30)->unique();
            $table->string('kode_bahan', 50);
            $table->integer('total_sak');
            $table->date('tanggal_masuk');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bahans');
    }
};
