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
        Schema::create('orangtua_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->unique();
            $table->string('nama_ayah', 100)->nullable();
            $table->string('pekerjaan_ayah', 100)->nullable();
            $table->string('pendidikan_ayah', 50)->nullable();
            $table->decimal('penghasilan_ayah', 15, 0)->nullable();
            $table->string('nama_ibu', 100)->nullable();
            $table->string('pekerjaan_ibu', 100)->nullable();
            $table->string('pendidikan_ibu', 50)->nullable();
            $table->decimal('penghasilan_ibu', 15, 0)->nullable();
            $table->integer('jumlah_tanggungan')->nullable();
            $table->string('no_wa_ortu', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orangtua_mahasiswa');
    }
};
