@section('title', 'Sensasi Club Sensasi')
@extends('layouts.website')
@section('content')

<section id="club" class="py-20 px-4 bg-gradient-to-br from-sky-50 to-blue-50">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sensasi Club</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <div class="flex justify-center mb-12">
            <div class="inline-flex bg-white rounded-full shadow-lg p-2">
                <button class="tab-btn px-6 py-3 rounded-full font-semibold transition active" data-tab="anggota">
                    <i class="fas fa-users mr-2"></i>Anggota
                </button>
                <button class="tab-btn px-6 py-3 rounded-full font-semibold transition" data-tab="karya">
                    <i class="fas fa-star mr-2"></i>Karya
                </button>
            </div>
        </div>

        <div id="anggota-tab" class="tab-content animate-fade-in">
            <div class="flex flex-wrap justify-center gap-8">
                @forelse ($datasensasiclub as $sensasiclub)
                    <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden text-center w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[250px]">
                        <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <img src="{{ $sensasiclub->mahasiswa->foto }}" loading="lazy" alt="Foto" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6">
                            <h4 class="font-bold text-lg text-gray-800 mb-1">{{ $sensasiclub->mahasiswa->user->name ?? '-' }}</h4>
                            <p class="text-sky-800 text-sm font-medium mb-3">{{ $sensasiclub->mahasiswa->mitra->nama_mitra ?? '-' }}</p>
                            <a href="#" class="text-sky-800 hover:text-sky-700">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </div>
                @empty
                    {{-- Tampilan Cantik saat Anggota Kosong --}}
                    <div class="w-full py-16 px-4 text-center">
                        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                            <i class="fas fa-users text-4xl text-gray-400"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Belum Ada Anggota</h3>
                        <p class="text-gray-500 max-w-sm mx-auto">
                            Daftar anggota Sensasi Club belum tersedia untuk saat ini. Tetap pantau untuk pembaruan selanjutnya!
                        </p>
                    </div>
                @endforelse
            </div>
        </div>

        <div id="karya-tab" class="tab-content hidden">
            <div class="mb-12">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Video YouTube</h3>
                <div class="flex flex-wrap justify-center gap-8">
                    @foreach ($datasensasiclubkaryawan as $sensasiclubkarya )
                        <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px]">
                            <div class="bg-gray-800 h-48 flex items-center justify-center relative">
                                @php
                                    preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/', $sensasiclubkarya->link_youtube, $matches);
                                    $youtubeId = $matches[1] ?? null;
                                @endphp
                                @if($youtubeId)
                                    <img src="https://img.youtube.com/vi/{{ $youtubeId }}/0.jpg" loading="lazy" alt="Thumbnail YouTube" class="w-full h-full object-cover">
                                    <a href="{{ $sensasiclubkarya->link_youtube }}" target="_blank" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                                        <i class="fab fa-youtube text-5xl text-red-600"></i>
                                    </a>
                                @else
                                    <i class="fab fa-youtube text-6xl text-red-600"></i>
                                @endif
                            </div>
                            <div class="p-6">
                                <h4 class="font-bold text-lg text-gray-800 mb-2">{{ $sensasiclubkarya->judul ?? '-' }}</h4>
                                <p class="text-sm text-gray-600 mb-1">{{ $sensasiclubkarya->mahasiswa->user->name ?? '-' }} - {{ $sensasiclubkarya->mahasiswa->mitra->nama_mitra ?? '-' }}</p>
                                <a href="{{ $sensasiclubkarya->link_youtube ?? '-' }}" target="_blank" class="inline-block mt-4 text-sky-800 hover:text-sky-700 font-medium text-sm">
                                    <i class="fab fa-youtube mr-2"></i>Tonton di YouTube
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div>
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Paper & Artikel</h3>
                <div class="flex flex-wrap justify-center gap-8">
                    @foreach ($datasensasiclubartikel as $sensasiclubartikel )
                        <div class="card-hover bg-white rounded-xl shadow-lg p-6 w-full md:w-[calc(50%-2rem)]">
                            <div class="flex items-start space-x-4">
                                <div class="bg-sky-100 rounded-lg p-1 flex-shrink-0 w-24 h-24 flex items-center justify-center">
                                    <img src="{{ $sensasiclubartikel->foto }}" loading="lazy" alt="foto" class="object-cover w-full h-full rounded-md">
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-lg text-gray-800 mb-2">{{ $sensasiclubartikel->judul ?? '-' }}</h4>
                                    <p class="text-sm text-gray-600 mb-2">Oleh: {{ $sensasiclubartikel->mahasiswa->user->name ?? '-' }} - {{ $sensasiclubartikel->mahasiswa->mitra->nama_mitra ?? '-' }}</p>
                                    <p class="text-xs text-gray-500 mb-3"><i class="fas fa-calendar mr-1"></i>{{ $sensasiclubartikel->created_at->format('d M Y') }} - {{ $sensasiclubartikel->created_at->format('H:i') }}</p>
                                    <p class="text-sm text-gray-600 mb-4">
                                        {{ \Illuminate\Support\Str::limit(strip_tags($sensasiclubartikel->deskripsi), 120) }}
                                    </p>
                                    <a href="{{ $sensasiclubartikel->pdf }}" class="text-sky-800 hover:text-sky-700 font-medium text-sm">
                                        <i class="fas fa-download mr-2"></i>Download PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                @if($datasensasiclubkaryawan->isEmpty() && $datasensasiclubartikel->isEmpty())
                    <div class="text-center py-20">
                        <img src="https://illustrations.popsy.co/amber/no-data.svg" class="w-48 mx-auto mb-4" alt="Empty">
                        <p class="text-gray-500 font-medium">Wah, belum ada karya yang dipajang di sini.</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</section>

@endsection