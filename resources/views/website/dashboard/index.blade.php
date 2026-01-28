@section('title', 'Dashboard Sensasi')
@extends('layouts.website')
@section('content')

<!-- Hero Section -->
<section id="home" class="bg-white pt-20 pb-32 px-4">
    <div class="max-w-7xl mx-auto mt-12">
        <div class="grid md:grid-cols-2 gap-12 items-center">
            @php
                $words = explode(' ', $dataherosection->name);
                $half = ceil(count($words) / 3);

                $title1 = implode(' ', array_slice($words, 0, $half));
                $title2 = implode(' ', array_slice($words, $half));
            @endphp

            <div class="animate-fade-in">
                <h1 class="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                    {{ $title1 }}
                    <span class="text-sky-800">{{ $title2 }}</span>
                </h1>
                <p class="text-lg md:text-xl mb-8 text-gray-600">
                    {{ strip_tags($dataherosection->deskripsi) }}
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#profile" class="bg-sky-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-700 transition shadow-lg">
                        Tentang Kami
                    </a>
                    <a href="#kontak" class="border-2 border-sky-700 text-sky-800 px-8 py-3 rounded-full font-semibold hover:bg-sky-800 hover:text-white transition">
                        Hubungi Kami
                    </a>
                </div>
            </div>
            <div class="hidden md:block">
                <div class="relative">

                    <!-- Background kuning miring -->
                    <div class="absolute inset-0 bg-sky-800 rounded-3xl transform rotate-6"></div>

                    <!-- Container utama -->
                    <div class="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">

                        <!-- SLIDESHOW -->
                        <div id="heroImageSlider" class="relative w-full h-96"> 
                            @foreach($dataherosection->herophotos as $photo)
                                <img 
                                    src="{{ asset('uploads/herosection/' . $photo->foto) }}"
                                    class="slide w-full h-full object-cover"
                                >
                            @endforeach
                        </div>

                    </div>

                </div>
            </div>

        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div class="stats-card text-center p-8 rounded-xl shadow-lg border border-gray-100" data-value="{{$countMitra}}">
                <div class="text-5xl font-bold text-sky-800 mb-2">{{$countMitra}}+</div>
                <div class="text-gray-700 font-semibold text-lg">Mitra</div>
            </div>
            <div class="stats-card text-center p-8 rounded-xl shadow-lg border border-gray-100" data-value="{{ $countalumni }}">
                <div class="text-5xl font-bold text-sky-800 mb-2">{{ $countalumni }}+</div>
                <div class="text-gray-700 font-semibold text-lg">Alumni</div>
            </div>
            <div class="stats-card text-center p-8 rounded-xl shadow-lg border border-gray-100" data-value="{{ $countkreative }}">
                <div class="text-5xl font-bold text-sky-800 mb-2">{{ $countkreative }}+</div>
                <div class="text-gray-700 font-semibold text-lg">Karya</div>
            </div>
            <div class="stats-card text-center p-8 rounded-xl shadow-lg border border-gray-100" data-value="{{ $countberita }}">
                <div class="text-5xl font-bold text-sky-800 mb-2">{{ $countberita }}+</div>
                <div class="text-gray-700 font-semibold text-lg">Berita</div>
            </div>
        </div>
    </div>
</section>

<!-- Profile Section -->
<section id="profile" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Profile Sensasi</h2>
        </div>

        <!-- Sejarah -->
        @php
            $fotoPertama = $datasejarah->fotos->first();
        @endphp
        <div class="mb-20">
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
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                @foreach ($sejarahfotos as $foto)
                    <div class="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                        <img 
                            src="{{ asset($foto->foto) }}" 
                            class="w-full h-full object-cover"
                        >
                    </div>
                    
                @endforeach
            </div>
        </div>

        <!-- Visi Misi -->
        <div class="mb-20 bg-gradient-to-r from-sky-50 to-sky-50 p-8 md:p-12 rounded-2xl">
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
            <h3 class="text-3xl font-bold text-gray-800 mb-8 text-center">Pengurus</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                @foreach ($datapengurus->take(4) as $pengurus)
                    <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
                        <div class="bg-gray-200 h-64 flex items-center justify-center">
                            <img src="{{ $pengurus->foto }}" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6">
                            <h4 class="font-bold text-xl text-gray-800 mb-1">{{  $pengurus->nama }}</h4>
                            <p class="text-sky-800 font-medium mb-3">{{ $pengurus->jabatan }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
            @if ($countpengurus > 4)
                <div class="mt-6 text-end">
                    <a href="#" class="text-sky-800 hover:text-sky-700 font-semibold">
                            Lihat Lainnya <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                </div>
            @endif
        </div>
    </div>
</section>

<!-- Mitra Section -->
<section id="mitra" class="py-20 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Mitra</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach ($datamitra as $mitra )
                <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <img src="{{ $mitra->logo_url }}" alt="">
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-xl text-gray-800 mb-2">{{ $mitra->nama_mitra }}</h4>
                        <p class="text-gray-600 mb-4 text-sm">{{ Str::limit(strip_tags($mitra->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span><i class="fas fa-calendar mr-2"></i>Sejak {{ $mitra->tahun_kerjasama }}</span>
                            <a href="{{ $mitra->link_website }}" class="text-sky-800 hover:text-sky-700 font-medium">
                                <i class="fas fa-external-link-alt mr-1"></i>Website
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        @if ($countmitra > 3)
            <div class="mt-6 text-end">
                <a href="#" class="text-sky-800 hover:text-sky-700 font-semibold">
                        Lihat Lainnya <i class="fas fa-arrow-right ml-2"></i>
                    </a>
            </div>
        @endif

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

<!-- Berita Section -->
<section id="berita" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Berita Terkini</h2>
        </div>

        <!-- Featured News -->
        <div class="mb-12">
            @foreach ($databerita->take(1) as $berita )
                <div class="card-hover bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-0">
                    <div class="bg-gray-200 aspect-video w-full overflow-hidden">
                        <img src="{{ $berita->foto }}" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="p-8 flex flex-col h-full">
                        <span class="inline-block w-fit self-start bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {{ $berita->ketegori }}
                        </span>
                        <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{{ $berita->judul }}</h3>
                        <p class="text-gray-600 mb-6">{{ Str::limit(strip_tags($berita->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between mt-auto">
                            <div class="text-sm text-gray-500">
                                <i class="fas fa-calendar mr-2"></i>{{ $berita->created_at->format('d M Y') }}
                                <i class="fas fa-clock ml-4 mr-2"></i>{{ $berita->created_at->format('H:i') }}
                            </div>
                            <a href="{{ route('user.berita.detail', $berita->id) }}" class="text-sky-800 hover:text-sky-700 font-semibold">
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
                        <span class="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">{{ $berita->ketegori }}</span>
                        <h4 class="font-bold text-lg text-gray-800 mb-3">{{ $berita->judul }}</h4>
                        <p class="text-gray-600 text-sm mb-4">{{ Str::limit(strip_tags($berita->deskripsi), 80, '...') }}</p>
                        <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span><i class="fas fa-calendar mr-1"></i>{{ $berita->created_at->format('d M Y') }}</span>
                            <span><i class="fas fa-clock mr-1"></i>{{ $berita->created_at->format('H:i') }}</span>
                        </div>
                        <a href="#" class="text-sky-800 hover:text-sky-700 font-medium text-sm">
                            Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
            @endforeach

        </div>

        <div class="text-center mt-12">
            <a href="#" class="inline-block bg-sky-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-700 transition">
                Lihat Semua Berita <i class="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
    </div>
</section>

<!-- Sensasi Club Section -->
<section id="club" class="py-20 px-4 bg-gradient-to-br from-sky-50 to-sky-50">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Sensasi Club</h2>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mb-12">
            <div class="inline-flex bg-white rounded-full shadow-lg p-2">
                <button class="tab-btn px-6 py-3 rounded-full font-semibold transition" data-tab="anggota">
                    <i class="fas fa-users mr-2"></i>Anggota
                </button>
                <button class="tab-btn px-6 py-3 rounded-full font-semibold transition" data-tab="karya">
                    <i class="fas fa-star mr-2"></i>Karya
                </button>
            </div>
        </div>

        <!-- Anggota Tab -->
        <div id="anggota-tab" class="tab-content">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                @foreach ($datasensasiclub as $sensasiclub )
                    <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden text-center">
                        <div class="bg-gray-200 h-48 flex items-center justify-center">
                           <img src="{{ $sensasiclub->mahasiswa->foto }}" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6">
                            <h4 class="font-bold text-lg text-gray-800 mb-1">{{ $sensasiclub->mahasiswa->user->name }}</h4>
                            <p class="text-sky-800 text-sm font-medium mb-3">{{ $sensasiclub->mahasiswa->mitra->nama_mitra }}</p>
                            {{-- <p class="text-gray-600 text-sm mb-4">Biodata singkat anggota dan keahlian yang dimiliki</p> --}}
                            <a href="#" class="text-sky-800 hover:text-sky-700">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </div>
                @endforeach

                {{-- <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden text-center">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <i class="fas fa-user text-6xl text-gray-400"></i>
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-lg text-gray-800 mb-1">Nama Anggota</h4>
                        <p class="text-sky-800 text-sm font-medium mb-3">Mitra B</p>
                        <p class="text-gray-600 text-sm mb-4">Biodata singkat anggota dan keahlian yang dimiliki</p>
                        <a href="#" class="text-sky-800 hover:text-sky-700">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>

                <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden text-center">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <i class="fas fa-user text-6xl text-gray-400"></i>
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-lg text-gray-800 mb-1">Nama Anggota</h4>
                        <p class="text-sky-800 text-sm font-medium mb-3">Mitra C</p>
                        <p class="text-gray-600 text-sm mb-4">Biodata singkat anggota dan keahlian yang dimiliki</p>
                        <a href="#" class="text-sky-800 hover:text-sky-700">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>

                <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden text-center">
                    <div class="bg-gray-200 h-48 flex items-center justify-center">
                        <i class="fas fa-user text-6xl text-gray-400"></i>
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-lg text-gray-800 mb-1">Nama Anggota</h4>
                        <p class="text-sky-800 text-sm font-medium mb-3">Mitra D</p>
                        <p class="text-gray-600 text-sm mb-4">Biodata singkat anggota dan keahlian yang dimiliki</p>
                        <a href="#" class="text-sky-800 hover:text-sky-700">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div> --}}
            </div>
            @if ($datasensasiclubcount > 4)
                <div class="mt-6 text-end">
                    <a href="#" class="text-sky-800 hover:text-sky-700 font-semibold">
                            Lihat Lainnya <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                </div>
            @endif
        </div>

        <!-- Karya Tab -->
        <div id="karya-tab" class="tab-content hidden">
            <div class="mb-12">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Video YouTube</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach ($datasensasiclubkaryawan as $sensasiclubkarya )
                        <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
                            <div class="bg-gray-800 h-48 flex items-center justify-center relative">
                                @php
                                    preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/', $sensasiclubkarya->link_youtube, $matches);
                                    $youtubeId = $matches[1] ?? null;
                                @endphp
                                @if($youtubeId)
                                    <img src="https://img.youtube.com/vi/{{ $youtubeId }}/hqdefault.jpg" alt="Thumbnail YouTube" class="w-full h-full object-cover">
                                    <a href="{{ $sensasiclubkarya->link_youtube }}" target="_blank" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                                        <i class="fab fa-youtube text-5xl text-red-600"></i>
                                    </a>
                                @else
                                    <i class="fab fa-youtube text-6xl text-red-600"></i>
                                @endif
                            </div>
                            <div class="p-6">
                                <h4 class="font-bold text-lg text-gray-800 mb-2">{{ $sensasiclubkarya->judul }}</h4>
                                <p class="text-sm text-gray-600 mb-1">{{ $sensasiclubkarya->mahasiswa->user->name }} - {{ $sensasiclubkarya->mahasiswa->mitra->nama_mitra }}</p>
                                <a href="{{ $sensasiclubkarya->link_youtube }}" class="inline-block mt-4 text-sky-800 hover:text-sky-700 font-medium text-sm">
                                    <i class="fab fa-youtube mr-2"></i>Tonton di YouTube
                                </a>
                            </div>
                        </div>
                    @endforeach

                </div>
            </div>

            <div>
                <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Paper & Artikel</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    @foreach ($datasensasiclubartikel as $sensasiclubartikel )
                        <div class="card-hover bg-white rounded-xl shadow-lg p-6">
                            <div class="flex items-start space-x-4">
                                <div class="bg-sky-100 rounded-lg p-1 flex-shrink-0 w-24 h-24 flex items-center justify-center">
                                    <img src="{{ $sensasiclubartikel->foto }}" alt="foto " class="object-cover w-full h-full rounded-md">
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold text-lg text-gray-800 mb-2">{{ $sensasiclubartikel->judul }}</h4>
                                    <p class="text-sm text-gray-600 mb-2">Oleh: {{ $sensasiclubartikel->mahasiswa->user->name }} - {{ $sensasiclubartikel->mahasiswa->mitra->nama_mitra }}</p>
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
                @if ($datasensasiclubkaryawancount > 3 || $datasensasiclubartikelcount > 2)
                    <div class="mt-6 text-end">
                        <a href="#" class="text-sky-800 hover:text-sky-700 font-semibold">
                                Lihat Lainnya <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</section>

<!-- Kolom Creative Section -->
<section id="creative" class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-4">Kolom Creative</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach ($datakreative as $kreative )
                <div class="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
                    <a href="{{ route('user.kreatif.detail', $kreative->id) }}">
                        <div class="bg-gradient-to-br from-sky-100 via-yellow-200 to-sky-100 h-64 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 opacity-30 bg-[url('/images/pattern.svg')] bg-repeat"></div>
                            @if($kreative->foto)
                                <img src="{{ asset($kreative->foto) }}" alt="{{ $kreative->nama }}" class="w-full h-full object-cover relative z-10">
                            @else
                                <i class="fas fa-file-alt text-6xl text-sky-800 relative z-10"></i>
                            @endif
                        </div>
                        <div class="p-6">
                            <span class="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Artikel</span>
                            <h4 class="font-bold text-lg text-gray-800 mb-3">{{ $kreative->nama }}</h4>
                            <div class="flex items-center text-sm text-gray-600 mb-4">
                                <i class="fas fa-user mr-2"></i>
                                <span>{{ $kreative?->biodataMahasiswa?->user?->name }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $kreative?->biodataMahasiswa?->mitra?->nama_mitra }}</span>
                            </div>
                        </div>
                    </a>
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

<!-- Kontak Section -->
<section id="kontak" class="py-20 px-4 gradient-bg hero-pattern">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <!-- Contact Form -->
            <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full md:max-w-none">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Masukkan nama Anda">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="email@example.com">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Subjek</label>
                        <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Subjek pesan">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">Pesan</label>
                        <textarea rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600" placeholder="Tulis pesan Anda di sini..."></textarea>
                    </div>
                    <button class="w-full bg-sky-800 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
                        <i class="fas fa-paper-plane mr-2"></i>Kirim Pesan
                    </button>
                </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-6 w-full md:max-w-none">
                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-map-marker-alt text-2xl text-sky-800"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Alamat</h4>
                        <p class="text-gray-600">{{ $datakontak->alamat }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-phone text-2xl text-sky-800"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Telepon</h4>
                        <p class="text-gray-600">{{ $datakontak->nomor }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                    <div class="bg-sky-100 rounded-full p-4 flex-shrink-0">
                        <i class="fas fa-envelope text-2xl text-sky-800"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-gray-800 mb-2">Email</h4>
                        <p class="text-gray-600">{{ $datakontak->email }}</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h4 class="font-bold text-lg text-gray-800 mb-4">Ikuti Kami</h4>
                    <div class="flex space-x-4">
                        <a href="{{ $datakontak->instagram }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->facebook }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->twitter }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->youtube }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->linkedin }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="{{ $datakontak->tiktok }}" class="bg-sky-100 hover:bg-sky-800 text-sky-800 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-tiktok text-xl"></i>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Sticky Daftar Button -->
@if ($pendaftaran->value == 1)
    <a href="{{ route('auth.register') }}"
    class="fixed bottom-6 left-6 z-50 bg-sky-800 text-white px-6 py-3 rounded-full shadow-xl
            font-semibold flex items-center gap-2
            hover:bg-sky-700 hover:scale-105 transition">
        <i class="fas fa-user-plus"></i>
        Daftar
    </a>
@endif


@endsection

    