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
        $user = auth()->user();
        $kategoriId = $request->query('kategori_id');

        if (!$kategoriId) {
            abort(404, 'Kategori tidak ditemukan');
        }

        $kategori = KategoriSoal::findOrFail($kategoriId);

        if ($kategori->is_active != 1) {
            abort(403, 'Kategori soal tidak aktif');
        }

        $mahasiswaId = null;

        if ($user->role == 9) {
            $biodata = BiodataMahasiswa::where('user_id', $user->id)->first();

            if (!$biodata) {
                abort(403, 'Biodata mahasiswa tidak ditemukan');
            }

            $mahasiswaId = $biodata->id;
        }

        $soals = Soal::with('pilihan')
            ->where('kategori_id', $kategoriId)
            ->orderBy('id')
            ->get();

        $nameuser   = $this->nameuser ?? $user->name;
        $userstatus = $this->userstatus ?? null;

        return view('admin.potensiakademik.soal', compact(
            'soals',
            'kategori',
            'kategoriId',
            'mahasiswaId',
            'nameuser',
            'userstatus'
        ));
    }

    public function getkategori(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $user = auth()->user();
        $loginRole = $user->role;

        $mahasiswa = BiodataMahasiswa::where('user_id', $user->id)->first();

        $query = KategoriSoal::select('id', 'name', 'waktu_pengerjaan','is_active')
            ->with(['hasilUjians' => function ($q) use ($loginRole, $mahasiswa) {
                if ($loginRole == 9 && $mahasiswa) {
                    $q->where('mahasiswa_id', $mahasiswa->id);
                }
            }])
            ->where('is_active', 1);

        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

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
