<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->string('no_do', 50)->nullable()->after('nomor_kendaraan');
            $table->string('gudang', 10)->default('A')->after('no_do');
        });
    }

    public function down(): void
    {
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->dropColumn(['no_do', 'gudang']);
        });
    }
};
