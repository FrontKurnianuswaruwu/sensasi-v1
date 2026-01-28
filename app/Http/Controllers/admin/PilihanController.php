<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pilihan;
use App\Models\Soal;
use Illuminate\Http\Request;

class PilihanController extends Controller
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
        return view('admin.pilihan.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Soal::select('id', 'pertanyaan', 'kategori_id');

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('pertanyaan', 'like', "%{$search}%");
            });
        }

        $soal = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $soal->items(),
            'total' => $soal->total(),
            'current_page' => $soal->currentPage(),
            'last_page' => $soal->lastPage()
        ]);
    }

    public function indexpilihan($id)
    {
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        $pertanyaan = Soal::find($id)->pertanyaan;
        return view('admin.pilihan.pilihan', [
            'idsoal' => $id, 
            'pertanyaan' => $pertanyaan,
            'nameuser' => $nameuser,
            'userstatus' => $userstatus
        ]);
    }

    public function getpilihan(Request $request, $id)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Soal::find($id)->pilihan()->select('id', 'soal_id', 'teks', 'is_true');

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('teks', 'like', "%{$search}%");
            });
        }

        $pilihan = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pilihan->items(),
            'total' => $pilihan->total(),
            'current_page' => $pilihan->currentPage(),
            'last_page' => $pilihan->lastPage()
        ]);
    }

    public function storepilihan(Request $request)
    {
        $request->validate([
            'teks' => 'required|string',
            'is_true' => 'required|boolean',
            'soal_id' => 'required|exists:soal,id',
        ]);

        $pilihan = new Pilihan();
        $pilihan->teks = $request->input('teks');
        $pilihan->is_true = $request->input('is_true');
        $pilihan->soal_id = $request->input('soal_id');
        $pilihan->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Pilihan berhasil ditambahkan', 
            'data' => $pilihan], 201
        );
    }

    public function showpilihan($id)
    {
        $pilihan = Pilihan::find($id);

        if (!$pilihan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pilihan tidak ditemukan.'
            ], 404);
        }

        return response()->json($pilihan);
    }

    public function updatepilihan(Request $request, $id)
    {
        $request->validate([
            'teks' => 'required|string',
            'is_true' => 'required|boolean',
        ]);

        $pilihan = Pilihan::find($id);

        if (!$pilihan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pilihan tidak ditemukan.'
            ], 404);
        }

        $pilihan->teks = $request->input('teks');
        $pilihan->is_true = $request->input('is_true');
        $pilihan->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Pilihan berhasil diperbarui.',
            'data' => $pilihan
        ]);
    }

    public function deletepilihan($id)
    {
        $pilihan = Pilihan::find($id);

        if (!$pilihan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pilihan tidak ditemukan.'
            ], 404);
        }

        $pilihan->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Pilihan berhasil dihapus.'
        ]);
    }
}
