<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriSoal;
use App\Models\Soal;
use App\Models\Pilihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PertanyaanController extends Controller
{
    protected $nameuser;
    protected $userstatus;

    public function __construct()
    {
        $this->nameuser   = auth()->user()->name;
        $this->userstatus = auth()->user()->status_user;
    }

    // -------------------------------------------------------
    // Halaman daftar kategori soal
    // -------------------------------------------------------
    public function index()
    {
        return view('admin.pertanyaan.index', [
            'nameuser'   => $this->nameuser,
            'userstatus' => $this->userstatus,
        ]);
    }

    // -------------------------------------------------------
    // API: daftar kategori soal (untuk tabel index)
    // -------------------------------------------------------
    public function getdata(Request $request)
    {
        $query = KategoriSoal::select('id', 'name', 'waktu_pengerjaan', 'is_active');

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $result = $query->paginate(
            $request->input('limit', 10), ['*'], 'page', $request->input('page', 1)
        );

        return response()->json([
            'data'         => $result->items(),
            'total'        => $result->total(),
            'current_page' => $result->currentPage(),
            'last_page'    => $result->lastPage(),
        ]);
    }

    // -------------------------------------------------------
    // Halaman daftar soal per kategori
    // -------------------------------------------------------
    public function indexpertanyaan($id)
    {
        $kategori = KategoriSoal::findOrFail($id);

        return view('admin.pertanyaan.soal', [
            'idkategori'   => $id,
            'namekategori' => $kategori->name,
            'nameuser'     => $this->nameuser,
            'userstatus'   => $this->userstatus,
        ]);
    }

    // -------------------------------------------------------
    // API: daftar soal per kategori
    // -------------------------------------------------------
    public function getdatapertanyaan(Request $request, $id)
    {
        $query = Soal::select('id', 'pertanyaan', 'kategori_id')
            ->withCount('pilihan')
            ->where('kategori_id', $id);

        if ($search = $request->input('search')) {
            $query->where('pertanyaan', 'like', "%{$search}%");
        }

        $result = $query->paginate(
            $request->input('limit', 10), ['*'], 'page', $request->input('page', 1)
        );

        return response()->json([
            'data'         => $result->items(),
            'total'        => $result->total(),
            'current_page' => $result->currentPage(),
            'last_page'    => $result->lastPage(),
        ]);
    }

    // -------------------------------------------------------
    // API: simpan soal + pilihan sekaligus
    // Payload: { name, kategori_id, pilihan: [{teks, is_true}] }
    // -------------------------------------------------------
    public function storesoal(Request $request)
    {
        $request->validate([
            'name'              => 'required|string',
            'kategori_id'       => 'required|exists:kategori_soal,id',
            'pilihan'           => 'required|array|min:2',
            'pilihan.*.teks'    => 'required|string',
            'pilihan.*.is_true' => 'required|boolean',
        ], [
            'pilihan.required'        => 'Minimal harus ada 2 opsi jawaban.',
            'pilihan.min'             => 'Minimal harus ada 2 opsi jawaban.',
            'pilihan.*.teks.required' => 'Teks opsi jawaban tidak boleh kosong.',
        ]);

        $benarCount = collect($request->pilihan)->where('is_true', true)->count();
        if ($benarCount === 0) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Minimal satu opsi harus ditandai sebagai jawaban benar.',
            ], 422);
        }

        DB::beginTransaction();
        try {
            $soal              = new Soal();
            $soal->pertanyaan  = $request->input('name');
            $soal->kategori_id = $request->input('kategori_id');
            $soal->save();

            foreach ($request->pilihan as $item) {
                Pilihan::create([
                    'teks'    => $item['teks'],
                    'is_true' => $item['is_true'],
                    'soal_id' => $soal->id,
                ]);
            }

            DB::commit();

            return response()->json([
                'status'  => 'success',
                'message' => 'Soal dan opsi jawaban berhasil ditambahkan.',
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => 'error',
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    // -------------------------------------------------------
    // API: detail soal + pilihan (untuk modal edit)
    // -------------------------------------------------------
    public function showsoal($id)
    {
        $soal = Soal::with('pilihan')->find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        return response()->json($soal);
    }

    // -------------------------------------------------------
    // API: update soal + pilihan
    // -------------------------------------------------------
    public function updatesoal(Request $request, $id)
    {
        $request->validate([
            'name'              => 'required|string',
            'pilihan'           => 'required|array|min:2',
            'pilihan.*.teks'    => 'required|string',
            'pilihan.*.is_true' => 'required|boolean',
        ]);

        $benarCount = collect($request->pilihan)->where('is_true', true)->count();
        if ($benarCount === 0) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Minimal satu opsi harus ditandai sebagai jawaban benar.',
            ], 422);
        }

        $soal = Soal::find($id);
        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        DB::beginTransaction();
        try {
            $soal->pertanyaan = $request->input('name');
            $soal->save();

            // Hapus pilihan lama, ganti dengan yang baru
            $soal->pilihan()->delete();

            foreach ($request->pilihan as $item) {
                Pilihan::create([
                    'teks'    => $item['teks'],
                    'is_true' => $item['is_true'],
                    'soal_id' => $soal->id,
                ]);
            }

            DB::commit();

            return response()->json([
                'status'  => 'success',
                'message' => 'Soal berhasil diperbarui.',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => 'error',
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    // -------------------------------------------------------
    // API: hapus soal + semua pilihannya
    // -------------------------------------------------------
    public function deletesoal($id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        $soal->pilihan()->delete();
        $soal->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Soal berhasil dihapus.',
        ]);
    }

    // -------------------------------------------------------
    // API: bulk delete soal + pilihan
    // -------------------------------------------------------
    public function bulkDeleteSoal(Request $request)
    {
        $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'required|integer|exists:soal,id',
        ]);

        DB::beginTransaction();
        try {
            $ids = $request->input('ids');

            // Hapus semua pilihan dari soal-soal yang dipilih
            Pilihan::whereIn('soal_id', $ids)->delete();

            // Hapus soal-soal yang dipilih
            Soal::whereIn('id', $ids)->delete();

            DB::commit();

            return response()->json([
                'status'  => 'success',
                'message' => count($ids) . ' soal berhasil dihapus.',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => 'error',
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }
}