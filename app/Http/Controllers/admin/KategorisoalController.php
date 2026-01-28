<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriSoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategorisoalController extends Controller
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
        return view('admin.kategorisoal.index', compact('nameuser', 'userstatus'));
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kategorisoal = KategoriSoal::create([
            'name' => $request->name,
            'waktu_pengerjaan' => $request->waktu_pengerjaan,
            'is_active' => $request->is_active,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Kategori berhasil ditambahkan', 
            'kategorisoal' => $kategorisoal
        ], 201);
    }

    public function show($id)
    {
        $kategorisoal = KategoriSoal::find($id);
        if (!$kategorisoal) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        return response()->json($kategorisoal);
    }

    public function update(Request $request, $id)
    {
        $kategorisoal = KategoriSoal::find($id);
        if (!$kategorisoal) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kategorisoal->name = $request->name;
        $kategorisoal->waktu_pengerjaan = $request->waktu_pengerjaan;
        $kategorisoal->is_active = $request->is_active;

        $kategorisoal->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data kategori berhasil diupdate', 
            'kategorisoal' => $kategorisoal],
        200);
    }

    public function delete($id)
    {
        $kategorisoal = KategoriSoal::find($id);

        if (!$kategorisoal) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        $kategorisoal->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data kategori berhasil dihapus'
        ], 200);
    }
}
