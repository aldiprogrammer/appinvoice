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
        Schema::table('bahan_masuks', function (Blueprint $table) {
            $table->renameColumn('tanggal_sampai', 'estimasi_sampai');
            $table->renameColumn('no_plat', 'no_kendaraan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bahan_masuks', function (Blueprint $table) {
            $table->renameColumn('estimasi_sampai', 'tanggal_sampai');
            $table->renameColumn('no_kendaraan', 'no_plat');
        });
    }
};
