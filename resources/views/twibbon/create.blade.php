<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buat Twibbon | SENSASI</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="{{ route('twibbon.index') }}" class="font-bold text-sky-700"><i class="fas fa-arrow-left mr-2"></i>Kembali</a>
            <span class="font-semibold text-gray-700">Buat Frame Twibbon</span>
        </div>
    </nav>

    <main class="w-full max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        <div class="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div class="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8">
                <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">Buat Twibbon Baru</h1>
                <p class="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-8">Upload template frame, isi judul dan custom link untuk dibagikan.</p>

                @if ($errors->any())
                    <div class="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-red-50 border border-red-200 p-3 sm:p-4 text-red-700 text-xs sm:text-sm">
                        <ul class="list-disc list-inside space-y-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('twibbon.store') }}" method="POST" enctype="multipart/form-data" class="space-y-3 sm:space-y-6">
                    @csrf
                    <div>
                        <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">Title <span class="text-red-500">*</span></label>
                        <input type="text" name="title" value="{{ old('title') }}" class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-sky-500 outline-none text-sm" placeholder="Contoh: Hari Pendidikan Nasional" required>
                    </div>

                    <div>
                        <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">Campaign Link</label>
                        <div class="flex rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 focus-within:border-sky-500">
                            <span class="px-2 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-500 text-xs sm:text-sm flex items-center truncate">{{ url('/twibbon') }}/</span>
                            <input type="text" name="slug" value="{{ old('slug') }}" class="flex-1 px-2 sm:px-4 py-2 sm:py-3 outline-none text-sm" placeholder="link-kampanye">
                        </div>
                        <p class="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">Boleh dikosongkan, otomatis dibuat dari title.</p>
                    </div>

                    <div>
                        <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">Description <span class="text-gray-400 font-normal">(Optional)</span></label>
                        <textarea name="description" rows="3 sm:rowspan-4" maxlength="1000" class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-sky-500 outline-none text-sm" placeholder="Share details about your campaign...">{{ old('description') }}</textarea>
                    </div>

                    <div>
                        <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">Template Frame <span class="text-red-500">*</span></label>
                        <label class="block cursor-pointer rounded-xl sm:rounded-3xl border-2 border-dashed border-gray-300 hover:border-sky-500 p-4 sm:p-8 text-center transition">
                            <i class="fas fa-cloud-upload-alt text-3xl sm:text-5xl text-gray-300 mb-2 sm:mb-4"></i>
                            <p class="font-semibold text-gray-700 text-sm sm:text-base">Klik untuk upload template</p>
                            <p class="text-[10px] sm:text-sm text-gray-500 mt-1 sm:mt-1">Disarankan PNG transparan, rasio 1:1, maksimal 2MB.</p>
                            <input id="templateInput" type="file" name="template_image" accept="image/*" class="hidden" required>
                        </label>
                    </div>

                    <button type="submit" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-lg text-sm sm:text-base">
                        <i class="fas fa-paper-plane mr-2"></i> Publish Twibbon
                    </button>
                </form>
            </div>

            <div class="bg-gray-900 rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 text-white">
                <h2 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Preview Template</h2>
                <div class="aspect-[4/5] sm:aspect-square rounded-xl sm:rounded-3xl bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center">
                    <img id="previewTemplate" src="" class="hidden w-full h-full object-contain" alt="Preview">
                    <div id="emptyPreview" class="text-center text-gray-400">
                        <i class="fas fa-image text-4xl sm:text-6xl mb-2 sm:mb-4"></i>
                        <p class="text-xs sm:text-sm">Preview template muncul di sini</p>
                    </div>
                </div>
                <div class="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-gray-800 p-3 sm:p-4 text-xs sm:text-sm text-gray-300">
                    <p class="font-semibold text-white mb-1 sm:mb-2"><i class="fas fa-lightbulb mr-2 text-yellow-400"></i>Tips template</p>
                    <ul class="list-disc list-inside space-y-1 text-[10px] sm:text-sm">
                        <li>Gunakan PNG transparan agar foto user terlihat.</li>
                        <li>Area kosong/transparan adalah tempat foto user.</li>
                        <li>Ukuran square 1080x1080 akan terlihat paling rapi.</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <script>
        document.getElementById('templateInput').addEventListener('change', function () {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('previewTemplate').src = e.target.result;
                document.getElementById('previewTemplate').classList.remove('hidden');
                document.getElementById('emptyPreview').classList.add('hidden');
            };
            reader.readAsDataURL(file);
        });
    </script>
</body>
</html>
