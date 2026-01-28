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
        Schema::create('hasil_ujian', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->unsignedBigInteger('kategori_id');
            $table->integer('jumlah_benar')->default(0);
            $table->integer('jumlah_salah')->default(0);
            $table->dateTime('tanggal')->useCurrent();
            $table->string('status')->default('selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_ujian');
    }
};
