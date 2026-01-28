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
        Schema::create('nilai_semester', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->string('semester', 10);
            $table->decimal('ip_semester', 3, 2);
            $table->string('khs_file')->nullable();
            $table->unsignedBigInteger('tahun_akademik_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilai_semester');
    }
};
