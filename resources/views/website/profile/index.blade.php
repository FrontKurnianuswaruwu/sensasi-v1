@extends('layouts.website')
@section('content')
@section('title', 'Profile Sensasi')

<!-- Profile Section -->
<section id="profile" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Profile Sensasi</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <!-- Sejarah -->
        @php
            $fotoPertama = $datasejarah->fotos->first();
        @endphp
        <div class="mb-20 animate-fade-in">
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Sejarah</h3>
            <div class="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        {{ strip_tags($datasejarah->deskripsi) }}
                    </p>
                </div>
                <div class="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                    @if($fotoPertama)
                        <img 
                            src="{{ asset($fotoPertama->foto) }}" 
                            class="w-full h-full object-cover"
                        >
                    @endif
                </div>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
                @foreach ($sejarahfotos as $foto)
                    <div class="bg-gray-200 rounded-lg h-40 flex items-center justify-center overflow-hidden w-[calc(50%-1rem)] md:w-[calc(25%-1rem)]">
                        <img 
                            src="{{ asset($foto->foto) }}" 
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            alt="Foto Sejarah"
                        >
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Visi Misi -->
        <div class="mb-20 bg-gradient-to-r from-sky-50 to-blue-50 p-8 md:p-12 rounded-2xl">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">Visi</h3>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        {{ strip_tags($datavisimisi->visi) }}
                    </p>
                </div>
                <div>
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">Misi</h3>
                    <ul class="space-y-4 list-disc">
                       {!! $datavisimisi->misi !!}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Pengurus -->
        <div>
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Tim Pengurus</h3>
            <div class="flex flex-wrap justify-center gap-8">
                @foreach ($datapengurus as $pengurus)
                    <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[260px]">
                        <div class="bg-gray-200 h-64 flex items-center justify-center">
                            <img src="{{ $pengurus->foto }}" alt="{{ $pengurus->nama }}" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6 text-center"> <h4 class="font-bold text-xl text-gray-800 mb-1">{{ $pengurus->nama }}</h4>
                            <p class="text-sky-600 font-medium mb-3">{{ $pengurus->jabatan }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

@endsection