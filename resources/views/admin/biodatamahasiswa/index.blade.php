@extends('layouts.admin')
@section('content')
@section('title', 'Data Biodata')
<!-- Main Content -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>
<main class="flex-1 lg:ml-0 overflow-x-hidden">
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
            

            <div class="flex justify-start border-b border-gray-200">
                <button class="tab-btn py-3 px-4 text-blue-primary font-medium border-b-4 border-blue-light flex items-center gap-2" data-tab="biodata">
                    <i class="fas fa-user"></i> Data Pribadi
                </button>
                <button class="tab-btn py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="akademik">
                    <i class="fas fa-graduation-cap"></i> Akademik
                </button>
                <button class="tab-btn py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="orangtua">
                    <i class="fas fa-users"></i> Orang Tua
                </button>
                <button class="tab-btn py-3 px-4 text-gray-600 hover:text-blue-primary flex items-center gap-2" data-tab="dokumen">
                    <i class="fas fa-file-alt"></i> Dokumen
                </button>
            </div>

            <div class="p-6">
                <div id="biodata" class="tab-content block">
                    {{-- <h2 class="text-xl font-semibold text-blue-primary mb-2">Installation via Vite</h2> --}}
                    <form id="biodataForm" class="space-y-6">
                        <!-- Foto Mahasiswa -->
                        <!-- Header Foto Biodata -->
                        <div class="relative w-full rounded-2xl overflow-hidden mb-8"
                            style="background: linear-gradient(135deg, #2563eb, #f97316);">

                            <div class="flex items-center gap-6 px-8 py-6">
                                <!-- Foto -->
                                <div class="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                    <img id="fotoPreview"
                                        src="https://ui-avatars.com/api/?name=Mahasiswa&background=random"
                                        class="w-full h-full object-cover"
                                        alt="Foto Mahasiswa">
                                </div>

                                <!-- Info & Upload -->
                                <div class="text-white space-y-2">
                                    <h3 class="text-xl font-semibold">Foto Mahasiswa</h3>
                                    <p class="text-sm text-white/80">
                                        Upload foto resmi (JPG / PNG, max 500KB)
                                    </p>

                                    <label for="foto"
                                        class="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                        <i class="fas fa-camera mr-2"></i>Ganti Foto
                                    </label>

                                    <input type="file"
                                        id="foto"
                                        name="foto"
                                        accept="image/*"
                                        class="hidden">
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Nama -->
                            <div class="space-y-2">
                                <label for="nama" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-user mr-2 text-blue-primary"></i>Nama
                                </label>
                                <input type="text" id="nama" name="nama"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan nama mahasiswa">
                            </div>

                            <!-- NIK -->
                            <div class="space-y-2">
                                <label for="nik" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-card mr-2 text-blue-primary"></i>NIK
                                </label>
                                <input type="text" id="nik" name="nik"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan NIK">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Tempat Lahir -->
                            <div class="space-y-2">
                                <label for="tempat_lahir" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-map-marker-alt mr-2 text-blue-primary"></i>Tempat Lahir
                                </label>
                                <input type="text" id="tempat_lahir" name="tempat_lahir"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan tempat lahir">
                            </div>

                            <!-- Tanggal Lahir -->
                            <div class="space-y-2">
                                <label for="tanggal_lahir" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-calendar-alt mr-2 text-blue-primary"></i>Tanggal Lahir
                                </label>
                                <input type="date" id="tanggal_lahir" name="tanggal_lahir"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Jenis Kelamin -->
                            <div class="space-y-2">
                                <label for="jenis_kelamin" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-venus-mars mr-2 text-blue-primary"></i>Jenis Kelamin
                                </label>
                                <select id="jenis_kelamin" name="jenis_kelamin"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary bg-white text-gray-500">
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <!-- Agama -->
                            <div class="space-y-2">
                                <label for="agama" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-praying-hands mr-2 text-blue-primary"></i>Agama
                                </label>
                                <input type="text" id="agama" name="agama"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="Masukkan agama">
                            </div>
                        </div>

                        <!-- Alamat -->
                        <div class="space-y-2">
                            <label for="alamat_ktp" class="block text-sm font-semibold text-gray-600">
                                <i class="fas fa-home mr-2 text-blue-primary"></i>Alamat KTP
                            </label>
                            <textarea id="alamat_ktp" name="alamat_ktp"
                                class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                rows="3" placeholder="Masukkan alamat sesuai KTP"></textarea>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- No WA -->
                            <div class="space-y-2">
                                <label for="no_wa" class="block text-sm font-semibold text-gray-600">
                                    <i class="fab fa-whatsapp mr-2 text-blue-primary"></i>No. WhatsApp
                                </label>
                                <input type="text" id="no_wa" name="no_wa"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="08xxxxxxxxxx">
                            </div>

                            <!-- Status Pernikahan -->
                            <div class="space-y-2">
                                <label for="status_pernikahan" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-ring mr-2 text-blue-primary"></i>Status Pernikahan
                                </label>
                                <select id="status_pernikahan" name="status_pernikahan"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary bg-white text-gray-500">
                                    <option value="">Pilih status</option>
                                    <option value="Belum Menikah">Belum Menikah</option>
                                    <option value="Menikah">Menikah</option>
                                    <option value="Duda/Janda">Duda/Janda</option>
                                </select>
                            </div>

                            <!-- NIM -->
                            <div class="space-y-2">
                                <label for="nim" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-badge mr-2 text-blue-primary"></i>NIM
                                </label>
                                <input type="number" id="nim" name="nim"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="Masukkan NIM">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Jumlah Saudara -->
                            <div class="space-y-2">
                                <label for="jumlah_saudara" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-users mr-2 text-blue-primary"></i>Jumlah Saudara
                                </label>
                                <input type="number" id="jumlah_saudara" name="jumlah_saudara"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="Contoh: 3">
                            </div>

                            <!-- Anak ke -->
                            <div class="space-y-2">
                                <label for="anak_ke" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-child mr-2 text-blue-primary"></i>Anak Ke
                                </label>
                                <input type="number" id="anak_ke" name="anak_ke"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="Contoh: 2">
                            </div>
                        </div>

                        <!-- Tombol Simpan -->
                        <div class="flex justify-start pt-6 border-t border-gray-200">
                            <button type="submit" id="submit"
                                class="px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                                <i class="fas fa-save mr-2"></i>Simpan Biodata
                            </button>
                        </div>
                    </form>
                </div>

                <div id="akademik" class="tab-content hidden">
                    <form id="akademikForm" class="space-y-6">
                        <!-- Baris 1: Universitas & Tahun Akademik -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Universitas -->
                            <div class="space-y-2">
                                <label for="universitas" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-university mr-2 text-blue-primary"></i>Universitas
                                </label>
                                <select id="universitas" name="universitas"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500">
                                </select>
                            </div>

                            <!-- Tahun Akademik -->
                            <div class="space-y-2">
                                <label for="tahun_akademik" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-calendar-alt mr-2 text-blue-primary"></i>Tahun Akademik
                                </label>
                                <select id="tahun_akademik" name="tahun_akademik"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500">
                                </select>
                            </div>
                        </div>

                        <!-- Baris 2: Fakultas & Program Studi -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Fakultas -->
                            <div class="space-y-2">
                                <label for="fakultas" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-building-columns mr-2 text-blue-primary"></i>Fakultas
                                </label>
                                <input type="text" id="fakultas" name="fakultas"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan nama fakultas">
                            </div>

                            <!-- Program Studi -->
                            <div class="space-y-2">
                                <label for="program_studi" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-graduation-cap mr-2 text-blue-primary"></i>Program Studi
                                </label>
                                <input type="text" id="program_studi" name="program_studi"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan nama program studi">
                            </div>
                        </div>

                        <!-- Baris 3: Semester & IP Terakhir -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Semester -->
                            <div class="space-y-2">
                                <label for="semester" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-layer-group mr-2 text-blue-primary"></i>Semester
                                </label>
                                <input type="number" id="semester" name="semester" min="1" max="14"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan semester saat ini">
                            </div>

                            <!-- IP Terakhir -->
                            <div class="space-y-2">
                                <label for="ip_terakhir" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-star mr-2 text-blue-primary"></i>IP Terakhir
                                </label>
                                <input type="number" step="0.01" id="ip_terakhir" name="ip_terakhir" min="0" max="4"
                                    class="input-focus w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Contoh: 3.45">
                            </div>
                        </div>

                        <!-- Tombol Simpan -->
                        <div class="flex justify-start pt-6 border-t border-gray-200">
                            <button type="submit" id="submitakademik"
                                class="px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                                <i class="fas fa-save mr-2"></i>Simpan Data Akademik
                            </button>
                        </div>
                    </form>
                </div>

                <div id="orangtua" class="tab-content hidden">
                    <form id="orangtuaForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Nama Ayah -->
                            <div class="space-y-2">
                                <label for="nama_ayah" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-user-tie mr-2 text-blue-primary"></i>Nama Ayah
                                </label>
                                <input type="text" id="nama_ayah" name="nama_ayah"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan nama ayah">
                            </div>

                            <!-- Pekerjaan Ayah -->
                            <div class="space-y-2">
                                <label for="pekerjaan_ayah" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-briefcase mr-2 text-blue-primary"></i>Pekerjaan Ayah
                                </label>
                                <input type="text" id="pekerjaan_ayah" name="pekerjaan_ayah"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukan pekerjaan ayah">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Pendidikan Ayah -->
                            <div class="space-y-2">
                                <label for="pendidikan_ayah" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-graduation-cap mr-2 text-blue-primary"></i>Pendidikan Ayah
                                </label>
                                <select id="pendidikan_ayah" name="pendidikan_ayah"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary bg-white text-gray-500">
                                    <option value="">Pilih pendidikan terakhir</option>
                                    <option value="SD">SD</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA">SMA</option>
                                    <option value="D3">D3</option>
                                    <option value="S1">S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                </select>
                            </div>

                            <!-- Penghasilan Ayah -->
                            <div class="space-y-2">
                                <label for="penghasilan_ayah" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-money-bill-wave mr-2 text-blue-primary"></i>Penghasilan Ayah (Rp)
                                </label>
                                <input type="text" id="penghasilan_ayah" name="penghasilan_ayah"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500 rupiah-input"
                                    placeholder="Masukan penghasilan ayah">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <!-- Nama Ibu -->
                            <div class="space-y-2">
                                <label for="nama_ibu" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-female mr-2 text-blue-primary"></i>Nama Ibu
                                </label>
                                <input type="text" id="nama_ibu" name="nama_ibu"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukkan nama ibu">
                            </div>

                            <!-- Pekerjaan Ibu -->
                            <div class="space-y-2">
                                <label for="pekerjaan_ibu" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-briefcase mr-2 text-blue-primary"></i>Pekerjaan Ibu
                                </label>
                                <input type="text" id="pekerjaan_ibu" name="pekerjaan_ibu"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500"
                                    placeholder="Masukan pekerjaan ibu">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Pendidikan Ibu -->
                            <div class="space-y-2">
                                <label for="pendidikan_ibu" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-graduation-cap mr-2 text-blue-primary"></i>Pendidikan Ibu
                                </label>
                                <select id="pendidikan_ibu" name="pendidikan_ibu"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary bg-white text-gray-500">
                                    <option value="">Pilih pendidikan terakhir</option>
                                    <option value="SD">SD</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA">SMA</option>
                                    <option value="D3">D3</option>
                                    <option value="S1">S1</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                </select>
                            </div>

                            <!-- Penghasilan Ibu -->
                            <div class="space-y-2">
                                <label for="penghasilan_ibu" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-money-bill-wave mr-2 text-blue-primary"></i>Penghasilan Ibu (Rp)
                                </label>
                                <input type="text" id="penghasilan_ibu" name="penghasilan_ibu"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 transition-all duration-300 text-gray-500 rupiah-input"
                                    placeholder="Masukan penghasilan ibu">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <!-- Jumlah Tanggungan -->
                            <div class="space-y-2">
                                <label for="jumlah_tanggungan" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-people-group mr-2 text-blue-primary"></i>Jumlah Tanggungan
                                </label>
                                <input type="number" id="jumlah_tanggungan" name="jumlah_tanggungan"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="Masukkan jumlah tanggungan">
                            </div>

                            <!-- No. WA Orang Tua -->
                            <div class="space-y-2">
                                <label for="no_wa_ortu" class="block text-sm font-semibold text-gray-600">
                                    <i class="fab fa-whatsapp mr-2 text-blue-primary"></i>No. WA Orang Tua/Wali
                                </label>
                                <input type="text" id="no_wa_ortu" name="no_wa_ortu"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary text-gray-500"
                                    placeholder="08xxxxxxxxxx">
                            </div>
                        </div>

                        <!-- Tombol Simpan -->
                        <div class="flex justify-start pt-6 border-t border-gray-200">
                            <button type="submit" id="submitorangtua"
                                class="px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                                <i class="fas fa-save mr-2"></i>Simpan Data Orang Tua
                            </button>
                        </div>
                    </form>
                </div>
                <div id="dokumen" class="tab-content hidden">
                    <form id="dokumenForm" class="space-y-6" enctype="multipart/form-data">
                        @csrf
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Scan KTP -->
                            <div class="space-y-2">
                                <label for="scan_ktp" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-card mr-2 text-blue-primary"></i>Scan KTP (PDF)
                                </label>
                                <input type="file" id="scan_ktp" name="scan_ktp" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                                
                            </div>

                            <!-- Scan Kartu Mahasiswa -->
                            <div class="space-y-2">
                                <label for="scan_kartu_mahasiswa" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-id-badge mr-2 text-blue-primary"></i>Scan Kartu Mahasiswa (PDF)
                                </label>
                                <input type="file" id="scan_kartu_mahasiswa" name="scan_kartu_mahasiswa" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Scan KK -->
                            <div class="space-y-2">
                                <label for="scan_kk" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-users mr-2 text-blue-primary"></i>Scan Kartu Keluarga (PDF)
                                </label>
                                <input type="file" id="scan_kk" name="scan_kk" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>

                            <!-- Transkrip Nilai -->
                            <div class="space-y-2">
                                <label for="transkrip_nilai" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-pdf mr-2 text-blue-primary"></i>Transkrip Nilai (PDF)
                                </label>
                                <input type="file" id="transkrip_nilai" name="transkrip_nilai" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Surat Keterangan Aktif -->
                            <div class="space-y-2">
                                <label for="surat_keterangan_aktif" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-signature mr-2 text-blue-primary"></i>Surat Keterangan Aktif (PDF)
                                </label>
                                <input type="file" id="surat_keterangan_aktif" name="surat_keterangan_aktif" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>

                            <!-- Foto Profil -->
                            <div class="space-y-2">
                                <label for="foto_profil" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-image mr-2 text-blue-primary"></i>Foto Profil (JPG/PNG)
                                </label>
                                <input type="file" id="foto_profil" name="foto_profil" accept="image/*"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Essay Motivasi -->
                            <div class="space-y-2">
                                <label for="essay_motivasi" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-file-alt mr-2 text-blue-primary"></i>Essay Motivasi (PDF)
                                </label>
                                <input type="file" id="essay_motivasi" name="essay_motivasi" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>

                            <!-- Sertifikat Prestasi -->
                            <div class="space-y-2">
                                <label for="sertifikat_prestasi" class="block text-sm font-semibold text-gray-600">
                                    <i class="fas fa-award mr-2 text-blue-primary"></i>Sertifikat Prestasi (PDF, optional)
                                </label>
                                <input type="file" id="sertifikat_prestasi" name="sertifikat_prestasi" accept="application/pdf"
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-primary focus:ring-0 text-gray-500">
                            </div>
                        </div>

                        <!-- Tombol Simpan -->
                        <div class="flex justify-start pt-6 border-t border-gray-200">
                            <button type="submit" id="submitdokumen"
                                class="px-6 py-3 text-white bg-orange-primary border border-orange-primary rounded-xl hover:bg-orange-light focus:ring-4 focus:ring-orange-200 transition-all duration-300 font-medium">
                                <i class="fas fa-save mr-2"></i>Simpan Dokumen
                            </button>
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