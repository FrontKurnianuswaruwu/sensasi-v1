<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiodataMahasiswa extends Model
{
    protected $table = 'biodata_mahasiswa';

    protected $fillable = [
        'user_id',
        'mitra_id',
        'nim',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat_ktp',
        'nik',
        'no_wa',
        'agama',
        'status_perkawinan',
        'jumlah_saudara',
        'anak_ke',
        'foto',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sensasiclubs()
    {
        return $this->hasMany(Sensasiclub::class, 'mahasiswa_id');
    }
    public function mitra()
    {
        return $this->belongsTo(Mitra::class, 'mitra_id');
    }
}
