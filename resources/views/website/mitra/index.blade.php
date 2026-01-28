@extends('layouts.website')
@section('content')
@section('title', 'Mitra Sensasi')

<!-- Mitra Section -->
<section id="mitra" class="py-20 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto mt-5">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Mitra Kami</h2>
            <div class="mt-8 flex items-center justify-center gap-2">
                <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            @foreach ($datamitra as $mitra )
                <div class="card-hover-page bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <img src="{{ $mitra->logo_url }}" alt="">
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-xl text-gray-800 mb-2">{{ $mitra->nama_mitra }}</h4>
                        <p class="text-gray-600 mb-4 text-sm">{{ Str::limit(strip_tags($mitra->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span><i class="fas fa-calendar mr-2"></i>Sejak {{ $mitra->tahun_kerjasama }}</span>
                            <a href="{{ $mitra->link_website }}" class="text-sky-600 hover:text-sky-700 font-medium">
                                <i class="fas fa-external-link-alt mr-1"></i>Website
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Alumni Section -->
        {{-- <div class="mt-20">
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Alumni Kami</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra A - 2023</p>
                </div>
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra B - 2023</p>
                </div>
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra C - 2024</p>
                </div>
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra D - 2024</p>
                </div>
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra E - 2024</p>
                </div>
                <div class="text-center">
                    <div class="bg-gray-200 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                        <i class="fas fa-user-graduate text-4xl text-gray-400"></i>
                    </div>
                    <h5 class="font-semibold text-gray-800 text-sm">Nama Alumni</h5>
                    <p class="text-xs text-gray-500">Mitra F - 2024</p>
                </div>
            </div>
        </div> --}}
    </div>
</section>

@endsection