<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengajuan_dana', function (Blueprint $table) {
            $table->integer('tipe')->after('total')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('pengajuan_dana', function (Blueprint $table) {
            $table->dropColumn('tipe');
        });
    }
};
