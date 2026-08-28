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
        Schema::table('penggunas', function (Blueprint $table) {
            if (! Schema::hasColumn('penggunas', 'nama')) {
                $table->string('nama')->nullable()->after('username');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('penggunas', function (Blueprint $table) {
            if (Schema::hasColumn('penggunas', 'nama')) {
                $table->dropColumn('nama');
            }
        });
    }
};
