<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twibbon | SENSASI</title>
    <meta name="description" content="Buat dan gunakan twibbon SENSASI.">
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="{{ route('user.dashboard.index') }}" class="flex items-center gap-2 font-bold text-sky-700">
                <img src="{{ asset('img/logo/logosensasi.webp') }}" class="h-10" alt="SENSASI">
            </a>
            <div class="flex items-center gap-3">
                <a href="{{ route('user.dashboard.index') }}" class="text-gray-600 hover:text-sky-600 font-medium">Home</a>
                <a href="{{ route('twibbon.create') }}" class="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 font-semibold"><i class="fas fa-plus mr-1"></i>Buat Twibbon</a>
            </div>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
            <div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Frame Twibbon Terbaru</h2>
                <p class="text-gray-500 mt-1">Pilih frame, upload foto, atur posisi, lalu download.</p>
            </div>
        </div>

        @if($twibbons->count() > 0)
            <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                @foreach($twibbons as $twibbon)
                    <a href="{{ route('twibbon.show', $twibbon->slug) }}" class="group bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
                        <div class="aspect-[4/5] bg-gray-100 overflow-hidden">
                            <img src="{{ asset($twibbon->template_image) }}" alt="{{ $twibbon->title }}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300">
                        </div>
                        <div class="p-3 md:p-5">
                            <h3 class="font-bold text-gray-900 text-sm md:text-base line-clamp-2 mb-1 md:mb-2">{{ $twibbon->title }}</h3>
                            <p class="text-xs md:text-sm text-gray-500 line-clamp-2 mb-3 md:mb-4">{{ $twibbon->description ?: 'Gunakan frame twibbon ini dan bagikan dukunganmu.' }}</p>
                            <div class="flex items-center justify-between text-[11px] md:text-xs text-gray-400">
                                <span><i class="fas fa-eye mr-1"></i>{{ $twibbon->view_count }}</span>
                                <span><i class="fas fa-download mr-1"></i>{{ $twibbon->download_count }}</span>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
            <div class="mt-10">{{ $twibbons->links() }}</div>
        @else
            <div class="text-center bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
                <i class="fas fa-image text-5xl md:text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-2">Belum ada twibbon</h3>
                <p class="text-sm md:text-base text-gray-500 mb-6">Jadilah yang pertama membuat frame twibbon.</p>
                <a href="{{ route('twibbon.create') }}" class="inline-flex px-5 py-3 rounded-xl bg-sky-600 text-white font-semibold">Buat Twibbon</a>
            </div>
        @endif
    </main>
</body>
</html>
