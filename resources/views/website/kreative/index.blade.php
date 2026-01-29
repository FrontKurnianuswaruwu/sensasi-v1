@section('title', 'Kreative Sensasi')
@extends('layouts.website')
@section('content')

<!-- Kolom Creative Section -->
<section id="creative" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Kolom Creative</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            @foreach ($datakreative as $kreative)
            <div class="card-hover-page bg-white rounded-xl shadow-lg overflow-hidden">
                <a href="{{ route('user.kreatif.detail', $kreative->id) }}">
                    <div class="bg-gradient-to-br from-sky-100 via-yellow-200 to-sky-100 h-64 flex items-center justify-center relative overflow-hidden">
                        @if($kreative->foto)
                            <img src="{{ asset($kreative->foto) }}" alt="{{ $kreative->nama }}" class="w-full h-full object-cover relative z-10">
                        @else
                            <i class="fas fa-file-alt text-6xl text-sky-800 relative z-10"></i>
                        @endif
                    </div>

                    <div class="p-6">
                        <span class="inline-block bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">Artikel</span>
                        <h4 class="font-bold text-lg text-gray-800 mb-3">{{ $kreative->nama }}</h4>

                        <div class="flex items-center text-sm text-gray-600 mb-4">
                            <i class="fas fa-user mr-2"></i>
                            <span>{{ $kreative?->biodataMahasiswa?->user?->name }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ $kreative?->biodataMahasiswa?->mitra?->nama_mitra }}</span>
                        </div>
                    </div>
                </a>

                <!-- link PDF DI LUAR link card -->
                <div class="px-6 pb-6">
                    <a href="{{ asset($kreative->pdf) }}" target="_blank" class="inline-block text-sky-600 hover:text-sky-700 font-medium text-sm">
                        <i class="fas fa-file-pdf mr-2"></i>Baca PDF
                    </a>
                </div>
            </div>
            @endforeach
        </div>

    </div>
</section>

@endsection