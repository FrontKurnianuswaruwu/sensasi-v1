@extends('layouts.admin')
@section('content')
@section('title', 'Data Sensasiclub')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden bg-gray-50 min-h-screen">
    <div class="p-4 lg:p-8">
        <!-- Header dengan timer di kanan -->
        <div class="mb-8 fade-in flex items-center justify-between">
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Test Potensi Akademik
            </h2>

            <!-- Timer di kanan judul -->
            <div id="timer" class="bg-white px-4 py-2 rounded-lg shadow-md text-gray-800 font-semibold">
                Waktu: <span id="countdown">10:00</span>
            </div>
        </div>
        <input type="hidden" id="waktuPengerjaan" value="{{ $waktupenngerjaan }}">

        <!-- Form Test dengan dummy data -->
        <form id="testForm" action="{{ route('admin.potensiakademik.submit') }}" method="POST" class="space-y-6 bg-white p-6 rounded-xl shadow-md mt-4">
            @csrf
            <input type="hidden" name="kategori_id" value="{{ $kategoriId }}">

            @foreach($soals as $index => $soal)
                <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p class="font-semibold mb-4">
                        {{ $index + 1 }}. {{ $soal->pertanyaan }}
                    </p>

                    <div class="space-y-2">
                        @foreach($soal->pilihan as $pilihan)
                            <label class="flex items-center space-x-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
                                <input type="radio"
                                    name="jawaban[{{ $soal->id }}]"
                                    value="{{ $pilihan->id }}"
                                    class="form-radio h-5 w-5 text-blue-600">
                                <span>{{ $pilihan->teks }}</span>
                            </label>
                        @endforeach
                    </div>
                </div>
            @endforeach

            <div class="pt-4 flex justify-end">
                <button type="submit" id="submit"
                        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                    Submit Jawaban
                </button>
            </div>
        </form>
    </div>

    <!-- Timer JS -->
</main>
<script>
    window.submitRoute = "{{ route('admin.potensiakademik.submit') }}";
</script>

@vite(['resources/css/user.css','resources/js/admin/potensiakademiksoal.js'])

@endsection