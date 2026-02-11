@extends('layouts.admin')
@section('content')
@section('title', 'Data Biodata')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 w-full">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Data Biodata
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li>
                        <span class="text-gray-500">Data Biodata</span>
                        {{-- <a href="/" class="text-orange-primary hover:underline">Dashboard</a> --}}
                    </li>
                    <li><span class="mx-2">/</span></li>
                    <li>
                        
                    </li>
                </ol>
            </nav>
        </div>

        <!-- Table Container -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in" style="animation-delay: 0.3s;">
            <!-- Desktop Table -->
            

            <div class="flex flex-wrap border-b border-gray-200">
                <button class="tab-btn w-1/2 sm:w-auto py-3 px-4 text-blue-primary font-medium border-b-4 border-blue-light flex items-center gap-2" data-tab="biodata">
                    <i class="fas fa-user"></i> Data Pribadi
                </button>

                <button class="tab-btn w-1/2 sm:w-auto py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="akademik">
                    <i class="fas fa-graduation-cap"></i> Akademik
                </button>

                <button class="tab-btn w-1/2 sm:w-auto py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="orangtua">
                    <i class="fas fa-users"></i> Orang Tua
                </button>

                <button class="tab-btn w-1/2 sm:w-auto py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="dokumen">
                    <i class="fas fa-file-alt"></i> Dokumen
                </button>
            </div>

            <div class="p-6">
                <div id="biodata" class="tab-content block">
                    <form id="biodataForm" class="space-y-8">
                        <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-200/50"
                            style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #f97316 100%);">
                            
                            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                            
                            <div class="relative flex flex-col md:flex-row items-center gap-8 px-10 py-8">
                                <div class="relative group">
                                    <div class="absolute -inset-1 bg-gradient-to-r from-white to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-50 group">
                                        <img id="fotoPreview"
                                            src="https://ui-avatars.com/api/?name=Mahasiswa&background=random"
                                            class="w-full h-full object-cover transform transition duration-500"
                                            alt="Foto Mahasiswa">
                                    </div>

                                    {{-- @if($userstatus == 'Biodata') --}}
                                        <label for="foto" class="absolute bottom-1 right-1 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center border-4 border-white cursor-pointer hover:bg-orange-600 transition-all shadow-lg">
                                            <i class="fas fa-camera text-sm"></i>
                                        </label>
                                        <input type="file" id="foto" name="foto" class="hidden" accept="image/*">
                                    {{-- @else
                                        <div class="absolute bottom-1 right-1 w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                            <i class="fas fa-lock text-xs"></i>
                                        </div>
                                    @endif --}}
                                </div>

                                <div class="space-y-2 flex-1"> 
                                    <label class="text-2xl font-bold text-white tracking-tight block">Foto Profil Mahasiswa</label>
                                    
                                    <p class="text-blue-100/80 text-sm max-w-xs leading-relaxed">
                                        Gunakan foto formal format <span class="text-white font-bold">JPG/PNG</span> (Maks. 500KB).
                                    </p>

                                    <input type="file" id="foto" name="foto" accept="image/*" class="hidden">

                                    <div class="flex items-center gap-3 pt-2">
                                        <div class="px-3 py-1.5 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2">
                                            <i class="fas fa-file-image text-white/50 text-xs"></i>
                                            <span class="file-name text-white text-xs">Belum ada file...</span>
                                        </div>
                                        
                                        <button type="button" class="btn-preview hidden px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-all">
                                            <i class="fas fa-eye mr-1"></i> Lihat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="w-1 h-6 bg-blue-600 rounded-full"></span>
                                <h4 class="font-bold text-gray-800 uppercase tracking-wider text-sm">Identitas Dasar</h4>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div class="group space-y-2">
                                    <label for="nama" class="inline-block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-blue-600">
                                        Nama Lengkap <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                                            <i class="fas fa-user text-sm"></i>
                                        </div>
                                        <input type="text" id="nama" name="nama"
                                            class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-gray-700 font-medium placeholder:text-gray-300"
                                            placeholder="Nama sesuai ijazah" required>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="nik" class="inline-block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-blue-600">
                                        NIK (Nomor Induk Kependudukan)
                                    </label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                                            <i class="fas fa-id-card text-sm"></i>
                                        </div>
                                        <input type="number" id="nik" name="nik"
                                            class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-gray-700 font-medium placeholder:text-gray-300"
                                            placeholder="16 digit angka" required>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="jenis_kelamin" class="inline-block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-blue-600">
                                        Jenis Kelamin <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                                            <i class="fas fa-venus-mars text-sm"></i>
                                        </div>
                                        <select id="jenis_kelamin" name="jenis_kelamin" 
                                            class="w-full pl-11 pr-10 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-gray-700 font-medium appearance-none cursor-pointer"  required>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                            <i class="fas fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label class="font-bold text-sm text-gray-700">Tempat Lahir</label>
                                    <input type="text" id="tempat_lahir" name="tempat_lahir" class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all placeholder:text-gray-300" placeholder="Kota kelahiran" required>
                                </div>

                                <div class="group space-y-2">
                                    <label class="font-bold text-sm text-gray-700">Tanggal Lahir</label>
                                    <input type="date" id="tanggal_lahir" name="tanggal_lahir" class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all" required>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50/50 rounded-2xl p-6 border border-dashed border-gray-200 space-y-6">
                            <div class="flex justify-between items-center">
                                <h4 class="font-bold text-gray-800 flex items-center gap-2">
                                    <i class="fas fa-map-marked-alt text-blue-600"></i> Domisili & Kontak
                                </h4>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="font-bold text-sm text-gray-700">Alamat Lengkap (KTP)</label>
                                <textarea id="alamat_ktp" name="alamat_ktp" rows="3" 
                                    class="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                                    placeholder="Jl. Nama Jalan, No. Rumah, RT/RW, Desa/Kelurahan, Kecamatan" required></textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="space-y-2">
                                    <label class="font-bold text-sm text-gray-700">WhatsApp</label>
                                    <div class="flex">
                                        <span class="inline-flex items-center px-4 rounded-l-2xl border-2 border-r-0 border-gray-100 bg-gray-100 text-gray-500 font-bold text-sm">+62</span>
                                        <input type="number" id="no_wa" name="no_wa" class="w-full px-4 py-3.5 bg-white border-2 border-gray-100 rounded-r-2xl focus:border-blue-500 transition-all" placeholder="812xxx" required>
                                    </div>
                                </div>
                                
                                <div class="space-y-2">
                                    <label class="font-bold text-sm text-gray-700">Agama</label>
                                    <div class="relative">
                                        <select id="agama" name="agama" class="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 appearance-none cursor-pointer"  required>
                                            <option value="">Pilih Agama</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">Kristen</option>
                                            <option value="Katolik">Katolik</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Budha">Budha</option>
                                            <option value="Khonghucu">Khonghucu</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                            <i class="fas fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="font-bold text-sm text-gray-700">Status</label>
                                    <div class="relative">
                                        <select name="status_pernikahan" class="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 appearance-none cursor-pointer"  required>
                                            <option value="Belum Menikah">Belum Menikah</option>
                                            <option value="Menikah">Menikah</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                            <i class="fas fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between gap-4 pt-4">
                            <div class="hidden md:block">
                                <p class="text-xs text-gray-400 italic">* Pastikan semua data sudah benar sebelum menyimpan.</p>
                            </div>
                            {{-- @if ($userstatus == "Biodata") --}}
                                <button type="submit" id="submit"
                                    class="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-orange-500 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 active:scale-95 shadow-lg shadow-orange-500/30">
                                    <span class="mr-2"><i class="fas fa-save group-hover:rotate-12 transition-transform"></i></span>
                                    Simpan Perubahan Biodata
                                </button>
                            {{-- @endif --}}
                        </div>
                    </form>
                </div>

                <div id="akademik" class="tab-content hidden animate-fade-in">
                    <form id="akademikForm" class="space-y-8">
                        <div class="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div class="space-y-2 text-center md:text-left">
                                    <h3 class="text-2xl font-bold tracking-tight">Status Pendidikan</h3>
                                    <p class="text-blue-100 text-sm opacity-90 leading-relaxed">
                                        Lengkapi informasi kampus dan pencapaian akademik terakhirmu untuk keperluan validasi beasiswa/program.
                                    </p>
                                </div>
                                <div class="flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30">
                                    <i class="fas fa-user-graduate text-4xl"></i>
                                </div>
                            </div>
                            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        </div>

                        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-university"></i>
                                </div>
                                <h4 class="font-bold text-gray-800 text-lg">Informasi Institusi</h4>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="group space-y-2">
                                    <label for="universitas" class="block text-sm font-bold text-gray-700 group-focus-within:text-blue-600 transition-colors">Universitas / Perguruan Tinggi</label>
                                    <div class="relative">
                                        <select id="universitas" name="universitas"
                                            class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-gray-600 font-medium"  required>
                                            </select>
                                        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                            <i class="fas fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="tahun_akademik" class="block text-sm font-bold text-gray-700 group-focus-within:text-blue-600 transition-colors">Tahun Akademik Aktif</label>
                                    <div class="relative">
                                        <select id="tahun_akademik" name="tahun_akademik"
                                            class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-gray-600 font-medium"  required>
                                            </select>
                                        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                            <i class="fas fa-calendar-check text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="nim" class="block text-sm font-bold text-gray-700 group-focus-within:text-blue-600 transition-colors">Nomor Induk Mahasiswa (NIM)</label>
                                    <div class="relative">
                                        <input type="text" id="nim" name="nim"
                                            class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all text-gray-600 font-medium placeholder:text-gray-300"
                                            placeholder="Contoh: 2010123456" required>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="fakultas" class="block text-sm font-bold text-gray-700 group-focus-within:text-blue-600">Nama Fakultas</label>
                                    <input type="text" id="fakultas" name="fakultas"
                                        class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all text-gray-600 font-medium placeholder:text-gray-300"
                                        placeholder="Contoh: Fakultas Ilmu Komputer" required>
                                </div>

                                <div class="group space-y-2">
                                    <label for="program_studi" class="block text-sm font-bold text-gray-700 group-focus-within:text-blue-600">Program Studi</label>
                                    <input type="text" id="program_studi" name="program_studi"
                                        class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all text-gray-600 font-medium placeholder:text-gray-300"
                                        placeholder="Contoh: Teknik Informatika" required>
                                </div>
                            </div>
                        </div>

                        <div class="bg-orange-50/30 rounded-3xl p-8 border border-orange-100 space-y-8">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <h4 class="font-bold text-gray-800 text-lg">Semester & Capaian (IPK)</h4>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="group space-y-2">
                                    <label for="semester" class="block text-sm font-bold text-gray-700">Semester Saat Ini</label>
                                    <div class="relative">
                                        <select id="semester" name="semester"
                                            class="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 transition-all appearance-none text-gray-600 font-bold"  required>
                                            <option value="">Pilih Semester</option>
                                            @for ($i = 1; $i <= 8; $i++)
                                                <option value="{{ $i }}">Semester {{ $i }}</option>
                                            @endfor
                                        </select>
                                        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-blue-600 font-bold">
                                            <i class="fas fa-layer-group text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="group space-y-2">
                                    <label for="ip_terakhir" class="block text-sm font-bold text-gray-700">Indeks Prestasi (IP) Terakhir</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <i class="fas fa-star text-orange-400"></i>
                                        </div>
                                        <input type="number" step="0.01" id="ip_terakhir" name="ip_terakhir" min="0" max="4"
                                            class="w-full pl-12 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 transition-all text-gray-700 font-bold placeholder:text-gray-300"
                                            placeholder="0.00" required>
                                    </div>
                                    <p class="text-[10px] text-gray-400 mt-1">* Masukkan IP semester terakhir (bukan IPK akumulatif)</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
                            <div class="hidden md:block">
                                <p class="text-xs text-gray-400 italic">
                                    <i class="fas fa-info-circle mr-1"></i> Data akademik akan diverifikasi oleh sistem.
                                </p>
                            </div>
                            {{-- @if ($userstatus == "Biodata") --}}
                                <button type="submit" id="submitakademik"
                                    class="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-orange-500 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 active:scale-95 shadow-lg shadow-orange-500/30">
                                    <span class="mr-2">
                                        <i class="fas fa-save group-hover:rotate-12 transition-transform"></i>
                                    </span>
                                    Simpan Data Akademik
                                </button>
                            {{-- @endif --}}
                        </div>
                    </form>
                </div>

                <div id="orangtua" class="tab-content hidden animate-fade-in">
                    <form id="orangtuaForm" class="space-y-8">
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                                        <i class="fas fa-user-tie text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-800">Data Ayah</h4>
                                        <p class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Informasi Kepala Keluarga</p>
                                    </div>
                                </div>

                                <div class="space-y-5">
                                    <div class="group">
                                        <label class="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-blue-600 transition-colors">NAMA LENGKAP AYAH</label>
                                        <input type="text" id="nama_ayah" name="nama_ayah"
                                            class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 font-medium"
                                            placeholder="Masukkan nama ayah" required>
                                    </div>

                                    <div class="group">
                                        <label class="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-blue-600">PEKERJAAN</label>
                                        <input type="text" id="pekerjaan_ayah" name="pekerjaan_ayah"
                                            class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all text-gray-700 font-medium"
                                            placeholder="Contoh: PNS, Wiraswasta" required>
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div class="group">
                                            <label class="block text-xs font-bold text-gray-500 mb-2">PENDIDIKAN</label>
                                            <select id="pendidikan_ayah" name="pendidikan_ayah"
                                                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 appearance-none text-gray-600 font-medium"  required>
                                                <option value="">Pilih</option>
                                                <option value="SD">SD</option>
                                                <option value="SMP">SMP</option>
                                                <option value="SMA">SMA</option>
                                                <option value="D3">D3</option>
                                                <option value="S1">S1</option>
                                                <option value="S2">S2</option>
                                                <option value="S3">S3</option>
                                            </select>
                                        </div>
                                        <div class="group">
                                            <label class="block text-xs font-bold text-gray-500 mb-2">PENGHASILAN (RP)</label>
                                            <input type="text" id="penghasilan_ayah" name="penghasilan_ayah"
                                                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 transition-all text-gray-700 font-bold rupiah-input"
                                                placeholder="0" required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                                    <div class="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center shadow-sm">
                                        <i class="fas fa-female text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-800">Data Ibu</h4>
                                        <p class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Informasi Ibu Kandung</p>
                                    </div>
                                </div>

                                <div class="space-y-5">
                                    <div class="group">
                                        <label class="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-pink-600 transition-colors">NAMA LENGKAP IBU</label>
                                        <input type="text" id="nama_ibu" name="nama_ibu"
                                            class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all text-gray-700 font-medium"
                                            placeholder="Masukkan nama ibu" required>
                                    </div>

                                    <div class="group">
                                        <label class="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-pink-600">PEKERJAAN</label>
                                        <input type="text" id="pekerjaan_ibu" name="pekerjaan_ibu"
                                            class="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-pink-500 transition-all text-gray-700 font-medium"
                                            placeholder="Contoh: Ibu Rumah Tangga" required>
                                    </div>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div class="group">
                                            <label class="block text-xs font-bold text-gray-500 mb-2">PENDIDIKAN</label>
                                            <select id="pendidikan_ibu" name="pendidikan_ibu"
                                                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-pink-500 appearance-none text-gray-600 font-medium"  required>
                                                <option value="">Pilih</option>
                                                <option value="SD">SD</option>
                                                <option value="SMP">SMP</option>
                                                <option value="SMA">SMA</option>
                                                <option value="D3">D3</option>
                                                <option value="S1">S1</option>
                                                <option value="S2">S2</option>
                                                <option value="S3">S3</option>
                                            </select>
                                        </div>
                                        <div class="group">
                                            <label class="block text-xs font-bold text-gray-500 mb-2">PENGHASILAN (RP)</label>
                                            <input type="text" id="penghasilan_ibu" name="penghasilan_ibu"
                                                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-pink-500 transition-all text-gray-700 font-bold rupiah-input"
                                                placeholder="0" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-xs font-bold text-gray-500 mb-2"><i class="fas fa-users mr-2 text-blue-500"></i>JUMLAH TANGGUNGAN</label>
                                    <input type="number" id="jumlah_tanggungan" name="jumlah_tanggungan"
                                        class="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 transition-all text-gray-700 font-bold"
                                        placeholder="Jumlah anak yang masih sekolah" required>
                                </div>
                                <div class="group">
                                    <label class="block text-xs font-bold text-gray-500 mb-2"><i class="fab fa-whatsapp mr-2 text-green-500"></i>NO. WA ORANG TUA/WALI</label>
                                    <input type="text" id="no_wa_ortu" name="no_wa_ortu"
                                        class="w-full px-5 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-500 transition-all text-gray-700 font-bold"
                                        placeholder="08123456789" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-end pt-4">
                            {{-- @if ($userstatus == "Biodata") --}}
                                <button type="submit" id="submitorangtua"
                                    class="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-orange-500 rounded-2xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 active:scale-95 shadow-lg shadow-orange-500/30">
                                    <span class="mr-2">
                                        <i class="fas fa-save group-hover:rotate-12 transition-transform"></i>
                                        </span>
                                        Simpan Data Orang Tua
                                </button>
                            {{-- @endif --}}
                        </div>
                    </form>
                </div>
                
                <div id="dokumen" class="tab-content hidden animate-fade-in">
                    <div class="mb-8 p-5 bg-orange-50 border border-orange-200 rounded-3xl flex items-center gap-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg font-bold">
                            i
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-800">Verifikasi Dokumen</p>
                            <p class="text-xs text-gray-600 uppercase tracking-wider">Format: PDF (Kecuali Foto) | Max Size: 500 KB</p>
                        </div>
                    </div>

                    <form id="dokumenForm" class="space-y-6" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2 group">
                                <label for="scan_ktp" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-card mr-2 text-blue-primary"></i>Scan KTP (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="scan_ktp" name="scan_ktp" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-file-pdf text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="scan_kartu_mahasiswa" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-badge mr-2 text-blue-primary"></i>Scan Kartu Mahasiswa (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="scan_kartu_mahasiswa" name="scan_kartu_mahasiswa" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-id-badge text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="scan_kk" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-users mr-2 text-blue-primary"></i>Scan Kartu Keluarga (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="scan_kk" name="scan_kk" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-users text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="transkrip_nilai" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-pdf mr-2 text-blue-primary"></i>Transkrip Nilai (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="transkrip_nilai" name="transkrip_nilai" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-graduation-cap text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="surat_keterangan_aktif" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-signature mr-2 text-blue-primary"></i>Surat Keterangan Aktif (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="surat_keterangan_aktif" name="surat_keterangan_aktif" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-file-contract text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="foto_profil" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-image mr-2 text-blue-primary"></i>Foto Profil (JPG/PNG)
                                </label>
                                <div class="relative">
                                    <input type="file" id="foto_profil" name="foto_profil" accept="image/*"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-camera text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih JPG/PNG...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="essay_motivasi" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-alt mr-2 text-blue-primary"></i>Essay Motivasi (PDF)
                                </label>
                                <div class="relative">
                                    <input type="file" id="essay_motivasi" name="essay_motivasi" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-pen-nib text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2 group">
                                <label for="sertifikat_prestasi" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-award mr-2 text-blue-primary"></i>Sertifikat Prestasi (PDF, optional)
                                </label>
                                <div class="relative">
                                    <input type="file" id="sertifikat_prestasi" name="sertifikat_prestasi" accept="application/pdf"
                                        class="file-input absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"  required>
                                    <div class="p-4 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-orange-400 bg-white transition-all flex items-center justify-between shadow-sm">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <i class="fas fa-medal text-gray-300 text-xl group-hover:text-orange-500"></i>
                                            <span class="text-xs text-gray-500 truncate file-name">Pilih file PDF...</span>
                                        </div>
                                        <button type="button" class="btn-preview hidden px-2 py-1 text-[10px] bg-blue-50 text-blue-600 rounded-lg font-bold">PREVIEW</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-start pt-6 border-t border-gray-200">
                            {{-- @if ($userstatus == "Biodata") --}}
                                <button type="submit" id="submitdokumen"
                                    class="px-8 py-4 text-white bg-orange-500 border border-orange-500 rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-bold shadow-lg shadow-orange-500/30">
                                    <i class="fas fa-save mr-2"></i>Simpan Dokumen
                                </button>
                            {{-- @endif --}}
                        </div>
                    </form>
                </div>    
            </div>

        </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div id="deleteModal" class="fixed inset-0 z-50 hidden">
        <div class="modal-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <!-- Header -->
                <div class="bg-red-500 px-6 py-4 rounded-t-2xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-white text-lg"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white">Konfirmasi Hapus</h3>
                    </div>
                </div>
                <input type="hidden" id="deleteemployeeId" name="id">

                <!-- Body -->
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-trash-alt text-3xl text-red-500"></i>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-500 mb-2">Apakah Anda yakin?</h4>
                        <p class="text-gray-500">Data Biodata <span id="deleteEmployeeName" class="font-semibold text-gray-500"></span> akan dihapus secara permanen dan tidak dapat dikembalikan.</p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <button type="button" 
                                id="cancelDeleteBtn"
                                class="w-full sm:w-auto px-6 py-3 text-gray-500 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-300 font-medium">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                        <button type="button" 
                                id="confirmDeleteBtn"
                                class="w-full sm:w-auto px-6 py-3 text-white bg-red-500 border border-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:ring-red-200 transition-all duration-300 font-medium">
                            <i class="fas fa-trash mr-2"></i>Ya, Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        tabButtons.forEach(b => {
          b.classList.remove('text-blue-primary', 'border-b-4', 'border-blue-light');
          b.classList.add('text-gray-500');
        });
        tabContents.forEach(content => content.classList.add('hidden'));

        // Activate current
        btn.classList.remove('text-gray-500');
        btn.classList.add('text-blue-primary', 'border-b-4', 'border-blue-light');
        document.getElementById(btn.dataset.tab).classList.remove('hidden');
      });
    });
  </script>
</main>
@vite(['resources/css/user.css','resources/js/admin/biodata.js'])

@endsection