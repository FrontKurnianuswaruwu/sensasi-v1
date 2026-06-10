<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Twibbon extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'template_image',
        'status',
        'view_count',
        'download_count',
    ];

    protected $casts = [
        'view_count' => 'integer',
        'download_count' => 'integer',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Auto generate slug dari title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($twibbon) {
            if (empty($twibbon->slug)) {
                $twibbon->slug = Str::slug($twibbon->title);

                // Cek jika slug sudah ada, tambahkan angka
                $count = 1;
                while (static::where('slug', $twibbon->slug)->exists()) {
                    $twibbon->slug = Str::slug($twibbon->title) . '-' . $count;
                    $count++;
                }
            }
        });
    }

    // Increment view count
    public function incrementViews()
    {
        $this->increment('view_count');
    }

    // Increment download count
    public function incrementDownloads()
    {
        $this->increment('download_count');
    }
}
