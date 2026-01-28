<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KategoriSoal;
use \App\Models\Soal;
use \App\Models\Hasilujian;
use \App\Models\BiodataMahasiswa;
use \App\Models\Pilihan;
use Illuminate\Support\Facades\DB;


class PotensiakademikController extends Controller
{
    protected $nameuser;
    protected $userstatus;
    public function __construct()
    {
        $this->nameuser = auth()->user()->name;
        $this->userstatus = auth()->user()->status_user;
    }
    public function index()
    {
        $userid = auth()->id();
        $mahasiswaId = BiodataMahasiswa::where('user_id', $userid)->first()->id;
        $hasilujian = Hasilujian::with('kategoriSoal')->where('mahasiswa_id', $mahasiswaId)->where('status', 'selesai')->first();
        $totalsoal = $hasilujian?->kategoriSoal?->soals()->count() ?? 0;
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        return view('admin.potensiakademik.index', compact('hasilujian', 'totalsoal', 'nameuser', 'userstatus'));
    }

    public function soal(Request $request)
    {
        $userid = auth()->id();
        $kategoriId = $request->kategori_id;
        $mahasiswaId = BiodataMahasiswa::where('user_id', $userid)->first()->id;
        $kategori = KategoriSoal::findOrFail($kategoriId);
        $nameuser = $this->nameuser;
        
        if (!$kategori->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kategori soal ini tidak aktif.'
            ], 403);
        }

        $soals = Soal::with('pilihan')
            ->where('kategori_id', $kategoriId)
            ->get();

        return view('admin.potensiakademik.soal', compact('soals', 'kategoriId', 'nameuser'));
    }

    public function getkategori(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $user = auth()->user();
        $loginRole = $user->role;

        // ambil mahasiswa login jika ada
        $mahasiswa = BiodataMahasiswa::where('user_id', $user->id)->first();

        // base query
        $query = KategoriSoal::select('id', 'name', 'waktu_pengerjaan','is_active')
            ->with(['hasilUjians' => function ($q) use ($loginRole, $mahasiswa) {
                if ($loginRole == 9 && $mahasiswa) {
                    $q->where('mahasiswa_id', $mahasiswa->id);
                }
            }])
            ->where('is_active', 1);

        // filter search
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

        // pagination
        $kategorisoal = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $kategorisoal->items(),
            'total' => $kategorisoal->total(),
            'current_page' => $kategorisoal->currentPage(),
            'last_page' => $kategorisoal->lastPage(),
            'role' => $loginRole
        ]);
    }


    public function submit(Request $request)
    {
        $userid = auth()->id();
        $mahasiswaId = BiodataMahasiswa::where('user_id', $userid)->first()->id;
        $kategoriId = $request->kategori_id;
        $jawaban = $request->jawaban; 

        $jumlahBenar = 0;
        $jumlahSalah = 0;

        foreach ($jawaban as $soalId => $pilihanId) {
            $pilihan = Pilihan::find($pilihanId);
            if (!$pilihan) continue;

            if ($pilihan->is_true) {
                $jumlahBenar++;
            } else {
                $jumlahSalah++;
            }
        }

        // Simpan langsung ke hasil_ujian
        $hasilUjian = HasilUjian::create([
            'mahasiswa_id' => $mahasiswaId,
            'kategori_id' => $kategoriId,
            'jumlah_benar' => $jumlahBenar,
            'jumlah_salah' => $jumlahSalah,
            'jawaban' => $jawaban,
            'tanggal' => now(),
            'status' => 'selesai',
        ]);

        // update status_user jadi Verifikasi
        $user = auth()->user();
        $user->status_user = 'Verifikasi';
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Jawaban berhasil disimpan!',
            'redirect_url' => route('admin.potensiakademik.index')
        ]);
    }
}
