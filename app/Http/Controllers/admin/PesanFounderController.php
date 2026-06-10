<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PesanFounder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PesanFounderController extends Controller
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
        return view('admin.pesanfounder.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = PesanFounder::select('id', 'nama', 'deskripsi');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        // pagination
        $pesanfounder = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pesanfounder->items(),
            'total' => $pesanfounder->total(),
            'current_page' => $pesanfounder->currentPage(),
            'last_page' => $pesanfounder->lastPage()
        ]);
    }

    public function show($id)
    {
        $pesanfounder = PesanFounder::findOrFail($id);
        if (!$pesanfounder) {
            return response()->json(['message' => 'Pesan Founder tidak ditemukan'], 404);
        }

        return response()->json($pesanfounder);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'nullable|string',
            'deskripsi' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pesanfounder = PesanFounder::create([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pesan Founder berhasil ditambahkan',
            'pesanfounder' => $pesanfounder
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'nullable|string',
            'deskripsi' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pesanfounder = PesanFounder::findOrFail($id);

        $pesanfounder->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pesan Founder berhasil diperbarui',
            'pesanfounder' => $pesanfounder
        ], 200);
    }

    public function destroy($id)
    {
        $pesanfounder = PesanFounder::findOrFail($id);
        $pesanfounder->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Pesan Founder berhasil dihapus'
        ], 200);
    }
}
