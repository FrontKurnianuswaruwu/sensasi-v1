<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AkademikMahasiswa extends Model
{
    protected $table = 'akademik_mahasiswa';

    protected $fillable = [
        'user_id',
        'tahun_akademik_id',
        'mitra_id',
        'fakultas',
        'program_studi',
        'semester',
        'ip_terakhir',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tahunAkademik()
    {
        return $this->belongsTo(TahunAkademik::class, 'tahun_akademik_id');
    }

    public function mitra()
    {
        return $this->belongsTo(Mitra::class, 'mitra_id');
    }
}
