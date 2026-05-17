<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    protected $table = 'pengaturan';
    protected $fillable = ['value', 'wajib_biodata'];

    // Method untuk ambil value pendaftaran (1 = terbuka, 0 = tutup)
    public static function getValue()
    {
        $setting = self::first(); // Ambil data pertama
        return $setting ? $setting->value : 0; // default 0 jika belum ada
    }

    // Method untuk toggle pendaftaran
    public static function toggle()
    {
        $setting = self::first();
        if(!$setting) {
            $setting = self::create(['value' => 1]);
        } else {
            $setting->value = $setting->value == 1 ? 0 : 1;
            $setting->save();
        }
        return $setting->value;
    }

    // Method untuk ambil value wajib biodata (1 = wajib, 0 = tidak wajib)
    public static function getWajibBiodata()
    {
        $setting = self::first();
        return $setting ? ($setting->wajib_biodata ?? 0) : 0;
    }

    // Method untuk toggle wajib biodata
    public static function toggleWajibBiodata()
    {
        $setting = self::first();
        if (!$setting) {
            $setting = self::create(['value' => 0, 'wajib_biodata' => 1]);
        } else {
            $setting->wajib_biodata = ($setting->wajib_biodata ?? 0) == 1 ? 0 : 1;
            $setting->save();
        }
        return $setting->wajib_biodata;
    }
}
