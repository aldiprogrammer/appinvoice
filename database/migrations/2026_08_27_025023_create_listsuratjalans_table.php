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
        Schema::create('listsuratjalans', function (Blueprint $table) {
            $table->id();
            $table->string('no_sj', 50);
            $table->string('status_cetak', 11);
            $table->string('status', 11);
            $table->string('tanggal', 30);
            $table->string('id_user', 30);
            $table->string('user_setujui', 30);
            $table->string('cetak', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listsuratjalans');
    }
};
