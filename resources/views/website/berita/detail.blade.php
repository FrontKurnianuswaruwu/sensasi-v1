@section('title', 'Detail Berita Sensasi')
@extends('layouts.website')
@section('content')

<section class="bg-gray-50 border-b mt-16">
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                Detail Berita
            </h1>
            <p class="text-sm text-gray-500 mt-1">
                Informasi lengkap dan terbaru
            </p>
        </div>

        <a href="{{ route('user.berita.index') }}" class="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">
            <i class="fas fa-arrow-left"></i>
            Kembali ke Berita
        </a>
    </div>
</section>
<section class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Konten Utama Berita -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div class="bg-gray-200 aspect-video w-full overflow-hidden">
                <img src="{{ asset($berita->foto) }}" alt="{{ $berita->judul }}" class="w-full h-full object-cover">
            </div>
            <div class="p-8">
                <span class="inline-block w-fit bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {{ $berita->ketegori }}
                </span>
                <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{{ $berita->judul }}</h1>
                <div class="text-sm text-gray-500 mb-6 flex items-center gap-4">
                    <span><i class="fas fa-calendar mr-1"></i>{{ $berita->created_at->format('d M Y') }}</span>
                    <span><i class="fas fa-clock mr-1"></i>{{ $berita->created_at->format('H:i') }}</span>
                </div>
                <div class="prose max-w-none text-gray-700">
                    {!! $berita->deskripsi !!}
                </div>
            </div>
        </div>

        <!-- Sidebar: Berita Terbaru -->
        <div class="space-y-6 animate-fade-in">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Berita Terbaru</h3>
            @foreach($databerita as $latest)
                <div class="flex gap-4 items-start bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                    <div class="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <img src="{{ asset($latest->foto) }}" alt="{{ $latest->judul }}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <a href="{{ route('user.berita.detail', $latest->id) }}" class="font-semibold text-gray-800 hover:text-sky-600">
                            {{ Str::limit($latest->judul, 50) }}
                        </a>
                        <p class="text-xs text-gray-500 mt-1">
                            <i class="fas fa-calendar mr-1"></i>{{ $latest->created_at->format('d M Y') }}
                        </p>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
</section>

@endsection