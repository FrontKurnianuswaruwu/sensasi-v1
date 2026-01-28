<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrangtuaMahasiswa extends Model
{
    protected $table = 'orangtua_mahasiswa';

    protected $fillable = [
        'user_id',
        'nama_ayah',
        'pekerjaan_ayah',
        'pendidikan_ayah',
        'penghasilan_ayah',
        'nama_ibu',
        'pekerjaan_ibu',
        'pendidikan_ibu',
        'penghasilan_ibu',
        'jumlah_tanggungan',
        'no_wa_ortu',
    ];
}
