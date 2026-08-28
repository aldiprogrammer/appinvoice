<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->string('alamat', 255)->after('customer');
            $table->string('harga', 50)->after('kemasan');
            $table->string('total_kg', 50)->after('jml_sak');
        });
    }

    public function down(): void
    {
        Schema::table('suratjalans', function (Blueprint $table) {
            $table->dropColumn(['alamat', 'harga', 'total_kg']);
        });
    }
};
