@extends('layouts.admin')
@section('content')
@section('title', 'Test Potensi Akademik')
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>

<main class="flex-1 lg:ml-0 overflow-x-hidden bg-gray-50 min-h-screen">
    <div class="p-4 lg:p-8">

        {{-- Header + Timer --}}
        <div class="mb-6 fade-in flex items-center justify-between flex-wrap gap-3">
            <h2 class="text-2xl lg:text-3xl font-bold">Test Potensi Akademik</h2>
            <div id="timer" class="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-md border-2 border-orange-100">
                <i class="fas fa-clock text-orange-500"></i>
                <span class="text-gray-600 font-semibold">Waktu:</span>
                <span id="countdown" class="text-orange-500 font-bold text-lg tabular-nums">00:00</span>
            </div>
        </div>

        <input type="hidden" id="waktuPengerjaan" value="{{ $waktupenngerjaan }}">

        {{-- Progress --}}
        <div class="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-600">
                    Soal <span id="currentSoalNum">1</span> dari {{ count($soals) }}
                </span>
                <span id="progressPercent" class="text-sm font-bold text-orange-500">0% terjawab</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div id="progressBar"
                     class="bg-gradient-to-r from-orange-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                     style="width: 0%"></div>
            </div>

            {{-- Navigator nomor soal --}}
            <div class="flex flex-wrap gap-2" id="soalNavigator">
                @foreach($soals as $i => $soal)
                    <button type="button"
                            class="soal-nav-btn w-9 h-9 rounded-xl text-sm font-bold border-2 transition-all duration-200
                                   {{ $i === 0 ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300' }}"
                            data-index="{{ $i }}">
                        {{ $i + 1 }}
                    </button>
                @endforeach
            </div>
        </div>

        {{-- Form --}}
        <form id="testForm" action="{{ route('admin.potensiakademik.submit') }}" method="POST">
            @csrf
            <input type="hidden" name="kategori_id" value="{{ $kategoriId }}">

            {{-- Soal Cards --}}
            @foreach($soals as $i => $soal)
            <div class="soal-card bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-4
                        {{ $i === 0 ? '' : 'hidden' }}"
                 data-index="{{ $i }}"
                 data-soal-id="{{ $soal->id }}">

                {{-- Nomor + Pertanyaan --}}
                <div class="flex items-start gap-4 mb-6">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600
                                flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {{ $i + 1 }}
                    </div>
                    <p class="text-gray-900 font-medium text-base lg:text-lg leading-relaxed pt-1">
                        {{ $soal->pertanyaan }}
                    </p>
                </div>

                {{-- Pilihan --}}
                <div class="space-y-3">
                    @foreach($soal->pilihan as $j => $pilihan)
                    <label class="pilihan-label flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl
                                  cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
                           for="pilihan_{{ $soal->id }}_{{ $pilihan->id }}">

                        <input type="radio"
                               class="hidden"
                               id="pilihan_{{ $soal->id }}_{{ $pilihan->id }}"
                               name="jawaban[{{ $soal->id }}]"
                               value="{{ $pilihan->id }}"
                               data-soal-index="{{ $i }}">

                        <div class="pilihan-circle w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center
                                    font-bold text-sm text-gray-400 flex-shrink-0 transition-all duration-200
                                    group-hover:border-orange-400 group-hover:text-orange-500">
                            {{ chr(65 + $j) }}
                        </div>

                        <span class="text-gray-700 text-sm lg:text-base leading-relaxed">
                            {{ $pilihan->teks }}
                        </span>
                    </label>
                    @endforeach
                </div>
            </div>
            @endforeach

            {{-- Navigasi --}}
            <div class="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-2">
                <button type="button" id="btnBack"
                        class="flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl
                               hover:bg-gray-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled>
                    <i class="fas fa-arrow-left text-sm"></i>
                    <span>Sebelumnya</span>
                </button>

                <span class="text-sm text-gray-400 font-medium hidden sm:block">
                    Pilih jawaban lalu lanjut ke soal berikutnya
                </span>

                <button type="button" id="btnNext"
                        class="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-semibold rounded-xl
                               hover:bg-orange-600 transition-all duration-200">
                    <span id="btnNextText">Berikutnya</span>
                    <i id="btnNextIcon" class="fas fa-arrow-right text-sm"></i>
                </button>
            </div>
        </form>
    </div>
</main>

{{-- Modal Konfirmasi Submit --}}
<div id="confirmModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-[99999]">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-scaleIn mx-4">
        <div class="text-center mb-6">
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-paper-plane text-3xl text-orange-500"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Kumpulkan Jawaban?</h3>
            <p class="text-gray-500 text-sm">
                Kamu telah menjawab
                <span id="summaryJawab" class="font-bold text-orange-500">0</span>
                dari <span class="font-bold">{{ count($soals) }}</span> soal.
            </p>
            <p id="warningBelumJawab" class="mt-2 text-red-500 text-xs font-semibold hidden">
                <i class="fas fa-exclamation-circle mr-1"></i>
                Masih ada soal yang belum dijawab!
            </p>
        </div>
        <div class="flex gap-3">
            <button id="cancelSubmit"
                    class="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all">
                <i class="fas fa-times mr-2"></i>Batal
            </button>
            <button id="confirmSubmit"
                    class="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all">
                <i class="fas fa-check mr-2"></i>Ya, Kumpulkan
            </button>
        </div>
    </div>
</div>

<style>
@keyframes scaleIn {
    from { transform: scale(.9); opacity: 0 }
    to   { transform: scale(1);  opacity: 1 }
}
.animate-scaleIn { animation: scaleIn .2s ease-out; }
</style>

<script>
    window.submitRoute = "{{ route('admin.potensiakademik.submit') }}";
    window.TOTAL_SOAL  = {{ count($soals) }};
</script>

@vite(['resources/css/user.css','resources/js/admin/potensiakademiksoal.js'])
@endsection