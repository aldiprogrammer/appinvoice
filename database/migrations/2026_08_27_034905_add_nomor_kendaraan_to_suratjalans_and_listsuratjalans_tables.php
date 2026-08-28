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
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->string('nomor_kendaraan')->nullable()->after('alamat');
        });
        Schema::table('listsuratjalans', function (Blueprint $table) {
            $table->string('nomor_kendaraan')->nullable()->after('no_sj');
        });
    }

    public function down(): void
    {
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->dropColumn('nomor_kendaraan');
        });
        Schema::table('listsuratjalans', function (Blueprint $table) {
            $table->dropColumn('nomor_kendaraan');
        });
    }
};
