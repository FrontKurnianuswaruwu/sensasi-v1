<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TahunAkademik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TahunakademikController extends Controller
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
        return view('admin.tahunakademik.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = TahunAkademik::select('id', 'tahun_akademik');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('tahun_akademik', 'like', "%{$search}%");
            });
        }

        // pagination
        $tahunakademik = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $tahunakademik->items(),
            'total' => $tahunakademik->total(),
            'current_page' => $tahunakademik->currentPage(),
            'last_page' => $tahunakademik->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tahun_akademik' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tahunakademik = TahunAkademik::create([
            'tahun_akademik' => $request->tahun_akademik,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tahun Akademik berhasil ditambahkan', 
            'tahunakademik' => $tahunakademik
        ], 201);
    }

    public function show($id)
    {
        $tahunakademik = TahunAkademik::find($id);
        if (!$tahunakademik) {
            return response()->json(['message' => 'Tahun akademik tidak ditemukan'], 404);
        }

        return response()->json($tahunakademik);
    }

    public function update(Request $request, $id)
    {
        $tahunakademik = TahunAkademik::find($id);
        if (!$tahunakademik) {
            return response()->json(['message' => 'TahunAkademik tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'tahun_akademik' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tahunakademik->tahun_akademik = $request->tahun_akademik;

        $tahunakademik->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data tahun akademik berhasil diupdate', 
            'tahunakademik' => $tahunakademik],
        200);
    }

    public function delete($id)
    {
        $tahunakademik = TahunAkademik::find($id);

        if (!$tahunakademik) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tahun Akademik tidak ditemukan'
            ], 404);
        }

        $tahunakademik->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Tahun akademik berhasil dihapus'
        ], 200);
    }
}
