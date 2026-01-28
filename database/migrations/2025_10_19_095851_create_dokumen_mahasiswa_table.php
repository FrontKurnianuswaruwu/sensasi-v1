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
        Schema::create('dokumen_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->unique();
            $table->string('scan_ktp')->nullable();
            $table->string('scan_kartu_mahasiswa')->nullable();
            $table->string('scan_kk')->nullable();
            $table->string('transkrip_nilai')->nullable();
            $table->string('surat_keterangan_aktif')->nullable();
            $table->string('foto_profil')->nullable();
            $table->string('essay_motivasi')->nullable();
            $table->string('sertifikat_prestasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_mahasiswa');
    }
};
