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
        Schema::create('pengajuan_dana', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->string('semester');
            $table->decimal('ip_semester', 3, 2);
            $table->decimal('spp_tetap', 15, 0)->default(0)->nullable();
            $table->decimal('spp_variabel', 15, 0)->default(0)->nullable();
            $table->decimal('praktikum', 15, 0)->default(0)->nullable();
            $table->integer('jml_sks')->default(0)->nullable();
            $table->decimal('nominal', 15, 0)->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_dana');
    }
};
