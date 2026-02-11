<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Herosection;
use App\Models\Kontak;
use App\Models\Kreative;
use App\Models\Mitra;
use App\Models\Pengurus;
use App\Models\Sejarah;
use App\Models\Sensasiclub;
use App\Models\Visimisi;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Pengajuandana;
use App\Models\Alumni;
use App\Models\BiodataMahasiswa;
use App\Models\Program;
use App\Models\Pengaturan;

class DashboardController extends Controller
{
    protected $datakontak;
    protected $herosection;

    public function __construct()
    {
        $this->datakontak = Kontak::first();
        $this->herosection = Herosection::with('herophotos')->first();
        
    }
    public function index()
    {
        $user = auth()->user();
        $userrole = $user->role;
        $rolename = Role::where('id', $userrole)->first()->name;
        $nameuser = $user->name;
        $userid = $user->id;
        $userstatus = $user->status_user;
        $countalumni = Alumni::count();
        $countmitra = Mitra::count();
        $countprogram = Program::count();
        $mitraId = $user->mitra_id;

        if ($userrole == 19) {
            $countalumni = Alumni::where('mitra_id', $mitraId)->count();

            $countpbsaktif = BiodataMahasiswa::whereHas('user', function($query) use ($mitraId) {
                $query->where('status_user', 'Aktif')
                      ->where('mitra_id', $mitraId);
            })->count();

            $countbiodata = BiodataMahasiswa::whereHas('user', function($query) use ($mitraId) {
                $query->where('status_user', 'Tidak Aktif')
                      ->where('mitra_id', $mitraId);
            })->count();
            
        } else {
            $countpbsaktif = BiodataMahasiswa::whereHas('user', function($query) {
                $query->where('status_user', 'Aktif');
            })->count();

            $countbiodata = BiodataMahasiswa::whereHas('user', function($query) {
                $query->where('status_user', 'Tidak Aktif');
            })->count();
        }
            
        $countpendaftarpbs = BiodataMahasiswa::whereHas('user', function($query) {
            $query->where('status_user', 'Verifikasi');
        })->count();
        $countbiodata = BiodataMahasiswa::whereHas('user', function($query) {
            $query->where('status_user', 'Tidak Aktif');
        })->count();

        $countalumniall = $countalumni + $countbiodata;
        $idmahasiswa = BiodataMahasiswa::where('user_id', $userid)->first();
        // total count kreative yang statusnya approved
        $countkreative = Kreative::where('status', 'approved')
            ->when($userrole == 9, function($query) use ($userid) {
                $query->where('user_id', $userid);
            })
            ->count();

        // total count pengajuan dana yang statusnya approved
        $countpengajuandana = Pengajuandana::where('status', 'approved')
            ->when($userrole == 9, function($query) use ($idmahasiswa) {
            $query->where('mahasiswa_id', $idmahasiswa->id ?? 0);
            })
            ->when($userrole == 19, function($query) use ($mitraId) {
            $query->whereHas('mahasiswa.user', function($subquery) use ($mitraId) {
                $subquery->where('mitra_id', $mitraId);
            });
            })
            ->count();

        $countpengajuandanaproses = Pengajuandana::where('status', 'pending')
            ->when($userrole == 9, function($query) use ($idmahasiswa) {
            $query->where('mahasiswa_id', $idmahasiswa->id ?? 0);
            })
            ->when($userrole == 19, function($query) use ($mitraId) {
            $query->whereHas('mahasiswa.user', function($subquery) use ($mitraId) {
                $subquery->where('mitra_id', $mitraId);
            });
            })
            ->count();

        $countpengajuandanaditolak = Pengajuandana::where('status', 'rejected')
            ->when($userrole == 9, function($query) use ($idmahasiswa) {
                $query->where('mahasiswa_id', $idmahasiswa->id ?? 0);
            })
            ->count();

        return view('admin.dashboard.index', compact(
            'rolename',
            'countkreative',
            'countpengajuandana',
            'countpengajuandanaproses',
            'countpengajuandanaditolak',
            'nameuser',
            'userstatus',
            'countalumniall',
            'userrole',
            'countmitra',
            'countprogram',
            'countpbsaktif',
            'countpendaftarpbs'
        ));
    }

    public function indexuser()
    {
        $countMitra = Mitra::count();
        $dataherosection = Herosection::with('herophotos')->first();
        $datasejarah = Sejarah::with('fotos')->first();
        // data sejarahfoto masukin kecuali yang pertama
        $sejarahfotos = $datasejarah->fotos->slice(1,4)->values();
        $datavisimisi = Visimisi::first();
        $datapengurus = Pengurus::take(4)->get();
        $countpengurus = Pengurus::count();
        $datamitra = Mitra::orderby('created_at','desc')->take(3)->get();
        $countmitra = Mitra::count();
        $databerita = Berita::orderBy('id','desc')->take(3)->get();
        $datasensasiclub = Sensasiclub::with('mahasiswa.user', 'mahasiswa.mitra')
            ->whereIn('id', function ($query) {
                $query->selectRaw('MAX(id)')
                    ->from('sensai_club')
                    ->groupBy('mahasiswa_id');
            })
            ->orderByDesc('id')
            ->get();
        $datasensasiclubcount = $datasensasiclub->count();
        $datasensasiclubkaryawan = Sensasiclub::orderBy('id','desc')
                ->where('jenis', 'youtube')
                ->with('mahasiswa.user', 'mahasiswa.mitra')
                ->take(3)
                ->get();
        $datasensasiclubkaryawancount = $datasensasiclubkaryawan->count();
        $datasensasiclubartikel = Sensasiclub::orderBy('id','desc')
                ->where('jenis', 'artikel')
                ->with('mahasiswa.user', 'mahasiswa.mitra')
                ->take(2)
                ->get();
        $datasensasiclubartikelcount = $datasensasiclubartikel->count();
        $datakreative = Kreative::orderBy('id','desc')->with('biodataMahasiswa.user','biodataMahasiswa.mitra')
                ->where('status', 'approved')
                ->take(3)
                ->get();
        $datakontak = Kontak::first();
        $countkreative = Kreative::where('status', 'approved')->count();
        $countalumni = Alumni::count();
        $countbiodata = BiodataMahasiswa::whereHas('user', function($query) {
            $query->where('status_user', 'Tidak Aktif');
        })->count();

        $countalumniall = $countalumni + $countbiodata;
        $countberita = Berita::count();
        $pendaftaran = Pengaturan::first();
        return view('website.dashboard.index',[
            'dataherosection' => $dataherosection,
            'countMitra' => $countMitra,
            'datasejarah' => $datasejarah,
            'datavisimisi' => $datavisimisi,
            'datapengurus' => $datapengurus,
            'datamitra' => $datamitra,
            'databerita' => $databerita,
            'datasensasiclub' => $datasensasiclub,
            'countmitra' => $countmitra,
            'countpengurus' => $countpengurus,
            'datasensasiclubkaryawan' => $datasensasiclubkaryawan,
            'datasensasiclubartikel' => $datasensasiclubartikel,
            'datasensasiclubcount' => $datasensasiclubcount,
            'datasensasiclubkaryawancount' => $datasensasiclubkaryawancount,
            'datasensasiclubartikelcount' => $datasensasiclubartikelcount,
            'datakreative' => $datakreative,
            'datakontak' => $datakontak,
            'countkreative' => $countkreative,
            'countalumni' => $countalumniall,
            'countberita' => $countberita,
            'sejarahfotos' => $sejarahfotos,
            'pendaftaran' => $pendaftaran,
        ]);
    }

    public function profile()
    {
        $datasejarah = Sejarah::with('fotos')->first();
        $sejarahfotos = $datasejarah->fotos->slice(1,4)->values();
        $datavisimisi = Visimisi::first();
        $datapengurus = Pengurus::get();
        return view('website.profile.index', [
            'datasejarah' => $datasejarah,
            'datavisimisi' => $datavisimisi,
            'datapengurus' => $datapengurus,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
            'sejarahfotos' => $sejarahfotos,
        ]);
    }

    public function mitra()
    {
        $datamitra = Mitra::orderby('created_at','desc')->get();
        return view('website.mitra.index', [
            'datamitra' => $datamitra,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
        ]);
    }

    public function berita()
    {
        $databerita = Berita::orderBy('id','desc')->get();
        return view('website.berita.index', [
            'databerita' => $databerita,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
        ]);
    }

    public function sensasiclub()
    {
        $datasensasiclub = Sensasiclub::with('mahasiswa.user', 'mahasiswa.mitra')
            ->whereIn('id', function ($query) {
                $query->selectRaw('MAX(id)')
                    ->from('sensai_club')
                    ->groupBy('mahasiswa_id');
            })
            ->orderByDesc('id')
            ->get();
        $datasensasiclubkaryawan = Sensasiclub::orderBy('id','desc')
                ->where('jenis', 'youtube')
                ->with('mahasiswa.user', 'mahasiswa.mitra')
                ->get();
        $datasensasiclubartikel = Sensasiclub::orderBy('id','desc')
                ->where('jenis', 'artikel')
                ->with('mahasiswa.user', 'mahasiswa.mitra')
                ->get();
        return view('website.sensasiclub.index', [
            'datasensasiclub' => $datasensasiclub,
            'datasensasiclubkaryawan' => $datasensasiclubkaryawan,
            'datasensasiclubartikel' => $datasensasiclubartikel,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
        ]);
    }

    public function kreatif()
    {
        $datakreative = Kreative::orderBy('id','desc')->with('biodataMahasiswa.user','biodataMahasiswa.mitra')
                ->where('status', 'approved')
                ->get();
        return view('website.kreative.index', [
            'datakreative' => $datakreative,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
        ]);
    }

    public function kontak()
    {
        return view('website.kontak.index', [
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
        ]);
    }

    public function detailberita($id)
    {
        $berita = Berita::findOrFail($id);
        $databerita = Berita::orderBy('id','desc')
                ->where('id', '!=', $id)
                ->take(5)
                ->get();
        return view('website.berita.detail', [
            'berita' => $berita,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
            'databerita' => $databerita,
        ]);
    }

    public function detailkreative($id)
    {
        $kreative = Kreative::with('biodataMahasiswa.user','biodataMahasiswa.mitra')->findOrFail($id);
        $datakreative = Kreative::orderBy('id','desc')
                ->where('id', '!=', $id)
                ->where('status', 'approved')
                ->take(5)
                ->get();
        return view('website.kreative.detail', [
            'kreative' => $kreative,
            'datakontak' => $this->datakontak,
            'dataherosection' => $this->herosection,
            'datakreative' => $datakreative,
        ]);
    }

    public function toggle()
    {
        $pengaturan = Pengaturan::first();

        if (!$pengaturan) {
            $pengaturan = new Pengaturan();
            $pengaturan->value = 0; 
        }

        $pengaturan->value = $pengaturan->value ? 0 : 1;
        $pengaturan->save();

        return response()->json(['value' => $pengaturan->value]);
    }

}
