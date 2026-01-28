@section('title', 'Berita Sensasi')
@extends('layouts.website')
@section('content')

<section id="berita" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Berita Terkini</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <!-- Featured News -->
        <div class="mb-12 animate-fade-in">
            @foreach ($databerita->take(1) as $berita )
                <div class="card-hover-page bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-0">
                    <div class="bg-gray-200 aspect-video w-full overflow-hidden">
                        <img src="{{ $berita->foto }}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8 flex flex-col h-full">
                        <span class="inline-block w-fit self-start bg-sky-100 text-sky-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {{ $berita->ketegori }}
                        </span>
                        <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{{ $berita->judul }}</h3>
                        <p class="text-gray-600 mb-6">{{ Str::limit(strip_tags($berita->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between mt-auto">
                            <div class="text-sm text-gray-500">
                                <i class="fas fa-calendar mr-2"></i>{{ $berita->created_at->format('d M Y') }}
                                <i class="fas fa-clock ml-4 mr-2"></i>{{ $berita->created_at->format('H:i') }}
                            </div>
                            <a href="{{ route('user.berita.detail', $berita->id) }}" class="text-sky-600 hover:text-sky-700 font-semibold">
                                Baca Selengkapnya <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach ($databerita->slice(1) as $berita )
                <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <img src="{{ $berita->foto }}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <span class="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">{{ $berita->ketegori }}</span>
                        <h4 class="font-bold text-lg text-gray-800 mb-3">{{ $berita->judul }}</h4>
                        <p class="text-gray-600 text-sm mb-4">{{ Str::limit(strip_tags($berita->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span><i class="fas fa-calendar mr-1"></i>{{ $berita->created_at->format('d M Y') }}</span>
                            <span><i class="fas fa-clock mr-1"></i>{{ $berita->created_at->format('H:i') }}</span>
                        </div>
                        <a href="{{ route('user.berita.detail', $berita->id) }}" class="text-sky-600 hover:text-sky-700 font-medium text-sm">
                            Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
            @endforeach

        </div>

    </div>
</section>

@endsection