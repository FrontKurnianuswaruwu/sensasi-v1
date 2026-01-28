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
        Schema::create('akademik_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->unique();
            $table->bigInteger('tahun_akademik_id')->unsigned()->nullable();
            $table->bigInteger('mitra_id')->unsigned()->nullable();
            $table->string('fakultas', 100)->nullable();
            $table->string('program_studi', 100)->nullable();
            $table->integer('semester')->nullable();
            $table->decimal('ip_terakhir', 3, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akademik_mahasiswa');
    }
};
