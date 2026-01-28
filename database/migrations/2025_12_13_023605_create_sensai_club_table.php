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
        Schema::create('sensai_club', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->string('judul');
            $table->string('link_youtube')->nullable();
            $table->string('pdf')->nullable();
            $table->enum('jenis', ['artikel', 'youtube']);
            $table->text('deskripsi')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensai_club');
    }
};
