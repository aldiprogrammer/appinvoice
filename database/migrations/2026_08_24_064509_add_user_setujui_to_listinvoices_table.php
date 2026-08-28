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
        Schema::table('listinvoices', function (Blueprint $table) {
            if (! Schema::hasColumn('listinvoices', 'user_setujui')) {
                $table->string('user_setujui', 11)->nullable()->after('id_user');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listinvoices', function (Blueprint $table) {
            if (Schema::hasColumn('listinvoices', 'user_setujui')) {
                $table->dropColumn('user_setujui');
            }
        });
    }
};
