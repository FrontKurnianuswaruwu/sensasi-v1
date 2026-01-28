<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilaiSemester extends Model
{
    protected $table = 'nilai_semester';

    protected $fillable = [
        'mahasiswa_id',
        'semester',
        'ip_semester',
        'khs_file',
        'tahun_akademik_id',
    ];

    public function tahunakademik()
    {
        return $this->belongsTo(TahunAkademik::class, 'tahun_akademik_id');
    }

    public function mahasiswa()
    {
        return $this->belongsTo(BiodataMahasiswa::class, 'mahasiswa_id');
    }
}
