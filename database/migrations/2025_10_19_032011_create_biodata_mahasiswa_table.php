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
        Schema::create('biodata_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->unique();
            $table->integer('nim')->unique();
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
            $table->text('alamat_ktp')->nullable();
            $table->string('nik', 20)->nullable();
            $table->string('no_wa', 20)->nullable();
            $table->string('agama', 20)->nullable();
            $table->enum('status_pernikahan', ['Belum Menikah', 'Menikah', 'Duda/Janda'])->nullable();
            $table->integer('jumlah_saudara')->nullable();
            $table->integer('anak_ke')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biodata_mahasiswa');
    }
};
