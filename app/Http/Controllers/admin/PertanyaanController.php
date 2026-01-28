<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriSoal;
use App\Models\Pertanyaan;
use App\Models\Soal;
use Illuminate\Http\Request;

class PertanyaanController extends Controller
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
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        return view('admin.pertanyaan.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = KategoriSoal::select('id', 'name', 'waktu_pengerjaan','is_active');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $kategorisoal = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $kategorisoal->items(),
            'total' => $kategorisoal->total(),
            'current_page' => $kategorisoal->currentPage(),
            'last_page' => $kategorisoal->lastPage()
        ]);
    }

    public function indexpertanyaan($id)
    {
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        $namekategori = KategoriSoal::find($id)->name;
        return view('admin.pertanyaan.soal', [
            'idkategori' => $id, 
            'namekategori' => $namekategori,
            'nameuser' => $nameuser,
            'userstatus' => $userstatus
        ]);
    }

    public function getdatapertanyaan(Request $request, $id)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Soal::select('id', 'pertanyaan', 'kategori_id')
            ->where('kategori_id', $id);

        if (!empty($search)) {
            $query->where('pertanyaan', 'like', "%{$search}%");
        }

        $pertanyaan = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pertanyaan->items(),
            'total' => $pertanyaan->total(),
            'current_page' => $pertanyaan->currentPage(),
            'last_page' => $pertanyaan->lastPage()
        ]);
    }

    public function storesoal(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'kategori_id' => 'required|exists:kategori_soal,id',
        ]);

        $soal = new Soal();
        $soal->pertanyaan = $request->input('name');
        $soal->kategori_id = $request->input('kategori_id');
        $soal->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Soal berhasil ditambahkan.'
        ], 201);
    }

    public function showsoal($id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        return response()->json($soal);
    }

    public function updatesoal(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        $soal->pertanyaan = $request->input('name');
        $soal->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Soal berhasil diperbarui.'
        ]);
    }

    public function deletesoal($id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json(['message' => 'Soal tidak ditemukan.'], 404);
        }

        $soal->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Soal berhasil dihapus.'
        ]);
    }

}
