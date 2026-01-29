<?php

use App\Http\Controllers\admin\AlumniadminController;
use App\Http\Controllers\admin\AlumniController;
use App\Http\Controllers\admin\ApprovalpengajuandanaController;
use App\Http\Controllers\admin\BeritaController;
use App\Http\Controllers\admin\BiodatamahasiswaController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\HerosectionController;
use App\Http\Controllers\admin\KategorisoalController;
use App\Http\Controllers\admin\KontakController;
use App\Http\Controllers\admin\KreativeController;
use App\Http\Controllers\admin\MenuController;
use App\Http\Controllers\admin\MitraController;
use App\Http\Controllers\admin\NilaisemesterController;
use App\Http\Controllers\admin\PbsaktifController;
use App\Http\Controllers\admin\PengajuandanaController;
use App\Http\Controllers\admin\PengurusController;
use App\Http\Controllers\admin\PermissionController;
use App\Http\Controllers\admin\PertanyaanController;
use App\Http\Controllers\admin\PilihanController;
use App\Http\Controllers\admin\PotensiakademikController;
use App\Http\Controllers\admin\ProgramController;
use App\Http\Controllers\admin\RiwayatpengajuandanaController;
use App\Http\Controllers\admin\RoleController;
use App\Http\Controllers\admin\SejarahController;
use App\Http\Controllers\admin\SensasiclubController;
use App\Http\Controllers\admin\SubmenuController;
use App\Http\Controllers\admin\TahunakademikController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\VisimisiController;
use App\Http\Controllers\admin\PendaftaranpbsController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('register', [AuthController::class, 'register'])->name('auth.register')->middleware('check.pendaftaran');
Route::post('/registerpost', [AuthController::class, 'registerpost'])->name('post.register');
Route::get('otp', [AuthController::class, 'otp'])->name('auth.otp');
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp'])->name('resend.otp');
Route::get('login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/login/post', [AuthController::class, 'loginpost'])->name('post.login');
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout'); 
Route::get('/', [DashboardController::class, 'indexuser'])->name('user.dashboard.index');
Route::get('/profile', [DashboardController::class, 'profile'])->name('user.profile.index');
Route::get('/mitra', [DashboardController::class, 'mitra'])->name('user.mitra.index');
Route::get('/berita', [DashboardController::class, 'berita'])->name('user.berita.index');
Route::get('/sensasiclub', [DashboardController::class, 'sensasiclub'])->name('user.sensasiclub.index');
Route::get('/kreatif', [DashboardController::class, 'kreatif'])->name('user.kreatif.index');
Route::get('/kontak', [DashboardController::class, 'kontak'])->name('user.kontak.index');
Route::get('berita/{id}', [DashboardController::class, 'detailberita'])->name('user.berita.detail');
Route::get('kreative/{id}', [DashboardController::class, 'detailkreative'])->name('user.kreatif.detail');

Route::middleware(['check.expired', 'check.permission'])->group(function() {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard.index');

    // User Routes
    Route::get('/admin/user', [UserController::class, 'index'])->name('admin.user.index');
    Route::get('/admin/getuser', [UserController::class, 'getdata'])->name('admin.user.getdata');
    Route::post('/user', [UserController::class, 'store']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::get('/admin/user/{id}', [UserController::class, 'show']);
    Route::delete('/user/{id}', [UserController::class, 'delete']);
    Route::get('/admin/getmitra/user', [UserController::class, 'getmitra'])->name('admin.user.getmitra');

    // Role Routes
    Route::get('/admin/role', [RoleController::class, 'index'])->name('admin.roles.index');
    Route::get('/admin/getroles', [RoleController::class, 'getdata'])->name('admin.roles.getdata');
    Route::post('/admin/role', [RoleController::class, 'store']);
    Route::get('/admin/role/{id}', [RoleController::class, 'show']);
    Route::put('/admin/user/{id}', [RoleController::class, 'update']);
    Route::delete('/admin/role/{id}', [RoleController::class, 'delete']);

    Route::get('/admin/menu', [MenuController::class, 'index'])->name('admin.menus.index');
    Route::get('/admin/getmenus', [MenuController::class, 'getdata'])->name('admin.menus.getdata');
    Route::get('/admin/menu/getroles', [MenuController::class, 'getdatarole'])->name('admin.menus.getdatarole');
    Route::post('/admin/menu', [MenuController::class, 'store']);
    Route::get('/admin/menu/{id}', [MenuController::class, 'show']);
    Route::put('/admin/menu/{id}', [MenuController::class, 'update']);
    Route::delete('/admin/menu/{id}', [MenuController::class, 'delete']);
    
    Route::get('/admin/submenu', [SubmenuController::class, 'index'])->name('admin.submenu.index');
    Route::get('/admin/getsubmenu', [SubmenuController::class, 'getdata'])->name('admin.submenu.getdata');
    Route::get('/admin/submenu/getmenus', [SubmenuController::class, 'getdatamenu'])->name('admin.submenu.getdatamenu');
    Route::post('/admin/submenu', [SubmenuController::class, 'store']);
    Route::get('/admin/submenu/{id}', [SubmenuController::class, 'show']);
    Route::put('/admin/submenu/{id}', [SubmenuController::class, 'update']);
    Route::delete('/admin/submenu/{id}', [SubmenuController::class, 'delete']);

    Route::get('/admin/program', [ProgramController::class, 'index'])->name('admin.programs.index');
    Route::get('/admin/getprogram', [ProgramController::class, 'getdata'])->name('admin.programs.getdata');
    Route::post('/admin/program', [ProgramController::class, 'store']);
    Route::get('/admin/program/{id}', [ProgramController::class, 'show']);
    Route::put('/admin/program/{id}', [ProgramController::class, 'update']);
    Route::post('/program/deleteImage', [ProgramController::class, 'deleteImage']);
    Route::delete('/admin/program/{id}', [ProgramController::class, 'delete']);

    Route::get('/admin/mitra', [MitraController::class, 'index'])->name('admin.mitra.index');
    Route::get('/admin/getmitra', [MitraController::class, 'getdata'])->name('admin.mitra.getdata');
    Route::post('/admin/mitra', [MitraController::class, 'store']);
    Route::get('/admin/mitra/{id}', [MitraController::class, 'show']);
    Route::put('/admin/mitra/{id}', [MitraController::class, 'update']);
    Route::delete('/admin/mitra/{id}', [MitraController::class, 'delete']);

    Route::get('admin/alumni', [AlumniController::class, 'index'])->name('admin.alumni.index');
    Route::get('/admin/getalumni', [AlumniController::class, 'getdata'])->name('admin.alumni.getdata');
    Route::get('/admin/alumni/getmitras', [AlumniController::class, 'getalumnis'])->name('admin.alumni.getalumnis');
    Route::post('/admin/alumni', [AlumniController::class, 'store']);
    Route::get('/admin/alumni/{id}', [AlumniController::class, 'show']);
    Route::put('/admin/alumni/{id}', [AlumniController::class, 'update']);
    Route::delete('/admin/alumni/{id}', action: [AlumniController::class, 'delete']);
    Route::post('/alumni/deleteFoto', [AlumniController::class, 'deleteFoto']);

    Route::get('/admin/kontak', [KontakController::class, 'index'])->name('admin.kontak.index');
    Route::get('/admin/getkontak', [KontakController::class, 'getdata'])->name('admin.kontak.getdata');
    Route::post('/admin/kontak', [KontakController::class, 'store']);
    Route::get('/admin/kontak/{id}', [KontakController::class, 'show']);
    Route::put('/admin/kontak/{id}', [KontakController::class, 'update']);
    Route::delete('/admin/kontak/{id}', [KontakController::class, 'delete']);

    Route::get('/admin/sejarah', [SejarahController::class, 'index'])->name('admin.sejarah.index');
    Route::get('/admin/getsejarah', [SejarahController::class, 'getdata'])->name('admin.sejarah.getdata');
    Route::get('/admin/sejarah/{id}', [SejarahController::class, 'show']);
    Route::put('/admin/sejarah/{id}', [SejarahController::class, 'update']);

    Route::get('/admin/visimisi', [VisimisiController::class, 'index'])->name('admin.visimisi.index');
    Route::get('/admin/getvisimisi', [VisimisiController::class, 'getdata'])->name('admin.visimisi.getdata');
    Route::get('/admin/visimisi/{id}', [VisimisiController::class, 'show']);
    Route::put('/admin/visimisi/{id}', [VisimisiController::class, 'update']);

    Route::get('/admin/pengurus', [PengurusController::class, 'index'])->name('admin.pengurus.index');
    Route::get('/admin/getpengurus', [PengurusController::class, 'getdata'])->name('admin.pengurus.getdata');
    Route::post('/admin/pengurus', [PengurusController::class, 'store']);
    Route::get('/admin/pengurus/{id}', [PengurusController::class, 'show']);
    Route::put('/admin/pengurus/{id}', [PengurusController::class, 'update']);
    Route::delete('/admin/pengurus/{id}', [PengurusController::class, 'delete']);
    Route::post('/pengurus/deleteFoto', [PengurusController::class, 'deleteFoto']);

    Route::get('/admin/berita', [BeritaController::class, 'index'])->name('admin.berita.index');
    Route::get('/admin/getberita', [BeritaController::class, 'getdata'])->name('admin.berita.getdata');
    Route::post('/admin/berita', [BeritaController::class, 'store']);
    Route::get('/admin/berita/{id}', [BeritaController::class, 'show']);
    Route::put('/admin/berita/{id}', [BeritaController::class, 'update']);
    Route::delete('/admin/berita/{id}', [BeritaController::class, 'delete']);
    Route::post('/berita/deleteFoto', [BeritaController::class, 'deleteFoto']);

    Route::get('/admin/kreatif', [KreativeController::class, 'index'])->name('admin.kreatif.index');
    Route::get('/admin/getkreatif', [KreativeController::class, 'getdata'])->name('admin.kreatif.getdata');
    Route::post('/admin/kreatif', [KreativeController::class, 'store']);
    Route::get('/admin/kreatif/{id}', [KreativeController::class, 'show']);
    Route::put('/admin/kreatif/{id}', [KreativeController::class, 'update']);
    Route::delete('/admin/kreatif/{id}', [KreativeController::class, 'delete']);
    Route::post('/kreatif/deletePdf', [KreativeController::class, 'deletePdf']);
    Route::post('/admin/approvekreatif/{id}', [KreativeController::class, 'approve']);
    Route::post('/admin/rejectkreatif/{id}', [KreativeController::class, 'reject']);

    Route::get('/admin/biodatamahasiswa', [BiodatamahasiswaController::class, 'index'])->name('admin.biodatamahasiswa.index');
    Route::get('/admin/getbiodatamahasiswa', [BiodatamahasiswaController::class, 'getdata'])->name('admin.biodatamahasiswa.getdata');
    Route::get('/admin/biodata/gettahunakademik', [BiodatamahasiswaController::class, 'gettahunakademik']);
    Route::put('/admin/biodatamahasiswa',[BiodatamahasiswaController::class,'update']);
    Route::get('/admin/biodata/getmitra', [BiodatamahasiswaController::class, 'getmitra']);
    Route::put('/admin/akademikmahasiswa',[BiodatamahasiswaController::class,'updateakademik']);
    Route::put('/admin/orangtuamahasiswa',[BiodatamahasiswaController::class,'updateorangtua']);
    Route::post('/admin/dokumenmahasiswa',[BiodatamahasiswaController::class,'updatedokumen']);

    Route::get('/admin/tahunakademik', [TahunakademikController::class, 'index'])->name('admin.tahunakademik.index');
    Route::get('/admin/gettahunakademik', [TahunakademikController::class, 'getdata'])->name('admin.tahunakademik.getdata');
    Route::post('/admin/tahunakademik', [TahunakademikController::class, 'store']);
    Route::get('/admin/tahunakademik/{id}', [TahunakademikController::class, 'show']);
    Route::put('/admin/tahunakademik/{id}', [TahunakademikController::class, 'update']);
    Route::delete('/admin/tahunakademik/{id}', [TahunakademikController::class, 'delete']);

    Route::get('/admin/nilaisemester', [NilaisemesterController::class, 'index'])->name('admin.nilaisemester.index');
    Route::get('/admin/getnilaisemester', [NilaisemesterController::class, 'getdata'])->name('admin.nilaisemester.getdata');
    Route::post('/admin/nilaisemester', [NilaisemesterController::class, 'store']);
    Route::get('/admin/nilaisemester/{id}', [NilaisemesterController::class, 'show']);
    Route::put('/admin/nilaisemester/{id}', [NilaisemesterController::class, 'update']);
    Route::delete('/admin/nilaisemester/{id}', [NilaisemesterController::class, 'delete']);
    Route::post('/nilaisemester/deleteFoto', [NilaisemesterController::class, 'deleteFoto']);

    Route::get('/admin/pengajuandana', [PengajuandanaController::class, 'index'])->name('admin.pengajuandana.index');
    Route::get('/admin/getpengajuandana', [PengajuandanaController::class, 'getdata'])->name('admin.pengajuandana.getdata');
    Route::get('/admin/get-ip-sebelumnya', [PengajuanDanaController::class, 'getIpSebelumnya']);
    Route::post('/admin/pengajuandana', [PengajuandanaController::class, 'store']);
    Route::get('/admin/pengajuandana/{id}', [PengajuandanaController::class, 'show']);
    Route::put('/admin/pengajuandana/{id}', [PengajuandanaController::class, 'update']);
    Route::delete('/admin/pengajuandana/{id}', [PengajuandanaController::class, 'delete']);
    Route::put('/admin/pengajuandanaapprove/{id}', [PengajuandanaController::class, 'approve']);
    Route::put('/admin/pengajuandanareject/{id}', [PengajuandanaController::class, 'reject']);

    Route::get('/admin/riwayatpengajuandana', [RiwayatpengajuandanaController::class, 'index'])->name('admin.riwayatpengajuandana.index');
    Route::get('/admin/getriwayatpengajuandana', [RiwayatpengajuandanaController::class, 'getdata'])->name('admin.riwayatpengajuandana.getdata');
    Route::get('/admin/riwayatpengajuandana/{id}', [RiwayatpengajuandanaController::class, 'show']);

    Route::get('/admin/approvalpengajuandana', [ApprovalpengajuandanaController::class, 'index'])->name('admin.approvalpengajuandana.index');
    Route::get('/admin/getapprovalpengajuandana', [ApprovalpengajuandanaController::class, 'getdata'])->name('admin.approvalpengajuandana.getdata');
    Route::get('/admin/approvalpengajuandana/{id}', [ApprovalpengajuandanaController::class, 'show']);

    Route::get('/admin/pbsaktif', [PbsaktifController::class, 'index'])->name('admin.pbsaktif.index');
    Route::get('/admin/getpbsaktif', [PbsaktifController::class, 'getdata'])->name('admin.pbsaktif.getdata');
    Route::put('/admin/confirmalumni/{id}', [PbsaktifController::class, 'confirmalumni']);

    Route::get('/admin/alumniadmin', [AlumniadminController::class, 'index'])->name('admin.alumniadmin.index');
    Route::get('/admin/getadminalumni', [AlumniadminController::class, 'getdata'])->name('admin.alumniadmin.getdata');
    Route::put('/admin/confirmpbsaktif/{id}', [AlumniadminController::class, 'confirmpbsaktif']);

    Route::get('/admin/kategorisoal', [KategorisoalController::class, 'index'])->name('admin.kategorisoal.index');
    Route::get('/admin/getkategorisoal', [KategorisoalController::class, 'getdata'])->name('admin.kategorisoal.getdata');
    Route::post('/admin/kategorisoal', [KategorisoalController::class, 'store']);
    Route::get('/admin/kategorisoal/{id}', [KategorisoalController::class, 'show']);
    Route::put('/admin/kategorisoal/{id}', [KategorisoalController::class, 'update']);
    Route::delete('/admin/kategorisoal/{id}', [KategorisoalController::class, 'delete']);

    Route::get('/admin/pertanyaan', [PertanyaanController::class, 'index'])->name('admin.pertanyaan.index');
    Route::get('/admin/getpertanyaan', [PertanyaanController::class, 'getdata'])->name('admin.pertanyaan.getdata');
    Route::get('/admin/pertanyaan/soal/{id}', [PertanyaanController::class, 'indexpertanyaan'])->name('admin.pertanyaan.soal.index');
    Route::get('/admin/getsoal/{id}', [PertanyaanController::class, 'getdatapertanyaan'])->name('admin.pertanyaan.soal.getdata');
    Route::post('/admin/pertanyaan/soal', [PertanyaanController::class, 'storesoal']);
    Route::get('/admin/getpertanyaan/soal/{id}', [PertanyaanController::class, 'showsoal']);
    Route::put('/admin/pertanyaan/soal/{id}', [PertanyaanController::class, 'updatesoal']);
    Route::delete('/admin/pertanyaan/soal/{id}', [PertanyaanController::class, 'deletesoal']);

    Route::get('/admin/pilihan', [PilihanController::class, 'index'])->name('admin.pilihan.index');
    Route::get('/admin/getsoal', [PilihanController::class, 'getdata'])->name('admin.pilihan.getdata');
    Route::get('/admin/pilihan/soal/{id}', [PilihanController::class, 'indexpilihan'])->name('admin.pilihan.soal.index');
    Route::get('/admin/pilihan/getpilihan/{id}', [PilihanController::class, 'getpilihan'])->name('admin.pilihan.soal.getdata');
    Route::post('/admin/pertanyaan/pilihan', [PilihanController::class, 'storepilihan']);
    Route::get('/admin/getpilihan/{id}', [PilihanController::class, 'showpilihan']);
    Route::put('/admin/pertanyaan/pilihan/{id}', [PilihanController::class, 'updatepilihan']);
    Route::delete('/admin/pertanyaan/pilihan/{id}', [PilihanController::class, 'deletepilihan']);

    Route::get('admin/herosection', [HerosectionController::class, 'index'])->name('admin.herosection.index');
    Route::get('/admin/getherosection', [HerosectionController::class, 'getdata'])->name('admin.herosection.getdata');
    Route::post('/admin/herosection', [HerosectionController::class, 'store']);
    Route::get('/admin/herosection/{id}', [HerosectionController::class, 'show']);
    Route::delete('/admin/herophoto/{id}', [HerosectionController::class, 'deletePhoto']);
    Route::put('/admin/herosection/{id}', [HerosectionController::class, 'update']);

    Route::get('/admin/sensasiclub', [SensasiclubController::class, 'index'])->name('admin.sensasiclub.index');
    Route::get('/admin/getsensasiclub', [SensasiclubController::class, 'getdata'])->name('admin.sensasiclub.getdata');
    Route::get('/admin/getmahasiswa/sensasiclub', [SensasiclubController::class, 'getmahasiswa'])->name('admin.sensasiclub.getmahasiswa');
    Route::post('/admin/sensasiclub', [SensasiclubController::class, 'store']);
    Route::get('/admin/sensasiclub/{id}', [SensasiclubController::class, 'show']);
    Route::put('/admin/sensasiclub/{id}', [SensasiclubController::class, 'update']);
    Route::delete('/admin/sensasiclub/{id}', [SensasiclubController::class, 'delete']);
    Route::delete('/sensasiclub/deletePdf', [SensasiclubController::class, 'deletePdf']);

    Route::get('/admin/potensiakademik', [PotensiakademikController::class, 'index'])->name('admin.potensiakademik.index');
    Route::get('/admin/getkategoripotensiakademik', [PotensiakademikController::class, 'getkategori'])->name('admin.potensiakademik.getkategori');
    Route::get('/admin/potensiakademik/soal', [PotensiakademikController::class, 'soal'])->name('admin.potensiakademik.soal.index');
    Route::post('/admin/potensiakademik/submit', [PotensiakademikController::class, 'submit'])->name('admin.potensiakademik.submit');

    Route::get('/admin/pendaftaranpbs', [PendaftaranpbsController::class, 'index'])->name('admin.pendaftaranpbs.index');
    Route::get('/admin/getpendaftaranpbs', [PendaftaranpbsController::class, 'getdata'])->name('admin.pendaftaranpbs.getdata');
    Route::put('/admin/confirmpbs/{id}', [PendaftaranpbsController::class, 'confirmpbsaktif']);

    Route::get('/admin/get-semester-sebelumnya', [NilaisemesterController::class, 'getSemesterSebelumnya'])->name('admin.nilaisemester.getSemesterSebelumnya');

    Route::post('/pendaftaran/toggle', [DashboardController::class, 'toggle'])->name('admin.pendaftaran.toggle');
    
    Route::get('/admin/permission', [PermissionController::class, 'index'])->name('admin.permissions.index');
    Route::get('/admin/getpermission', [PermissionController::class, 'getdata'])->name('admin.permission.getdata');
    Route::post('/permission-role/store', [PermissionController::class, 'store']);
});

