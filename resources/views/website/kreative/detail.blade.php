@section('title', 'Detail Kreative Sensasi')
@extends('layouts.website')
@section('content')

<section class="bg-gray-50 border-b mt-16">
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                Detail Kreative
            </h1>
            <p class="text-sm text-gray-500 mt-1">
                Informasi lengkap dan terbaru
            </p>
        </div>

        <a href="{{ route('user.kreatif.index') }}" class="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">
            <i class="fas fa-arrow-left"></i>
            Kembali ke Kreative
        </a>
    </div>
</section>
<section class="bg-gradient-to-b from-sky-50 to-white py-20 px-4">
    <div class="max-w-6xl mx-auto space-y-16">

        <div class="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <img 
                src="{{ asset($kreative->foto) }}" 
                alt="{{ $kreative->nama }}"
                class="w-full h-[420px] object-cover"
            >

            <div class="absolute inset-0 bg-black/50 flex items-end">
                <div class="p-8 md:p-12 text-white">
                    <span class="inline-block bg-white/20 text-xs px-3 py-1 rounded-full mb-4">
                        Karya Kreatif
                    </span>
                    <h1 class="text-3xl md:text-5xl font-bold leading-tight">
                        {{ $kreative->nama }}
                    </h1>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div class="lg:col-span-2">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    Tentang Karya
                </h2>

                <div class="prose max-w-none text-gray-700">
                    {!! $kreative->deskripsi !!}
                </div>
            </div>

            <div class="space-y-6">

                <div class="bg-white rounded-2xl shadow-lg p-6">
                    <h3 class="font-bold text-gray-800 mb-4">
                        Kreator
                    </h3>

                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xl">
                            {{ strtoupper(substr($kreative->biodataMahasiswa->user->name ?? 'U', 0, 1)) }}
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800">
                                {{ $kreative->biodataMahasiswa->user->name ?? 'Tidak diketahui' }}
                            </p>
                            <p class="text-xs text-gray-500">
                                Dipublikasikan {{ $kreative->created_at->format('d M Y') }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-sky-600 text-white rounded-2xl p-6">
                    <h3 class="font-bold mb-4">Akses Karya</h3>

                    @if($kreative->pdf)
                        <a 
                            href="{{ asset($kreative->pdf) }}" 
                            target="_blank"
                            class="flex items-center justify-center gap-2 w-full bg-white text-sky-600 py-3 rounded-xl font-semibold hover:bg-sky-50 transition"
                        >
                            <i class="fas fa-file-pdf"></i>
                            Lihat / Unduh Karya
                        </a>
                    @else
                        <p class="text-sm opacity-80">
                            Tidak ada file karya terlampir.
                        </p>
                    @endif
                </div>

            </div>
        </div>

        <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
                Karya Kreatif Lainnya
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                @foreach($datakreative as $item)
                    <a 
                        href="{{ route('user.kreatif.detail', $item->id) }}"
                        class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                        <div class="h-40 overflow-hidden">
                            <img 
                                src="{{ asset($item->foto) }}" 
                                alt="{{ $item->nama }}"
                                class="w-full h-full object-cover group-hover:scale-105 transition"
                            >
                        </div>

                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800 group-hover:text-sky-600">
                                {{ Str::limit($item->nama, 40) }}
                            </h3>
                            <p class="text-xs text-gray-500 mt-1">
                                {{ $item->created_at->format('d M Y') }}
                            </p>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>

    </div>
</section>


@endsection