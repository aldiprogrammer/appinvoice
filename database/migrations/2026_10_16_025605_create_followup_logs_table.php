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
        Schema::create('followup_logs', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name', 150)->index();
            $table->string('last_tanggal', 30);
            $table->string('last_no_bon', 50)->nullable();
            $table->string('last_no_sj', 50)->nullable();
            $table->timestamp('followed_up_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followup_logs');
    }
};
