<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class AlumniController extends Controller
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
        return view('admin.alumni.index', compact('nameuser', 'userstatus'));
    }

    // getdata
    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Alumni::with('mitra')->select('id', 'nama_lengkap', 'tahun_lulus', 'program_studi','mitra_id');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%");
            });
        }

        // pagination
        $alumni = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $alumni->items(),
            'total' => $alumni->total(),
            'current_page' => $alumni->currentPage(),
            'last_page' => $alumni->lastPage()
        ]);
    }

    public function getalumnis()
    {
        $mitras = Mitra::select('id', 'nama_mitra')->get();
        return response()->json($mitras);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_lengkap'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/alumni';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/alumni/' . $fotoName;
        } else {
            $fotoPath = $request->oldImage;
        }

        $alumni = Alumni::create([
            'nama_lengkap'        => $request->nama_lengkap,
            'mitra_id' => $request->mitra_id,
            'tahun_lulus'  => $request->tahun_lulus, 
            'program_studi'    => $request->program_studi, 
            'foto'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Alumni berhasil ditambahkan',
            'alumni' => $alumni
        ], 201);
    }

    public function show($id)
    {
        $alumni = Alumni::find($id);
        if (!$alumni) {
            return response()->json(['message' => 'Alumni tidak ditemukan'], 404);
        }

        return response()->json($alumni);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_lengkap'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $alumni = Alumni::findOrFail($id);

        // default foto lama
        $fotoPath = $alumni->foto;

        if ($request->hasFile('foto')) {
            // hapus foto lama kalau ada
            if ($alumni->foto && file_exists(public_path($alumni->foto))) {
                unlink(public_path($alumni->foto));
            }

            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/alumni';
            $foto->move($destinationPath, $fotoName);

            $fotoPath = 'img/alumni/' . $fotoName;
        }

        $alumni->update([
            'nama_lengkap'        => $request->nama_lengkap,
            'mitra_id' => $request->mitra_id,
            'tahun_lulus'  => $request->tahun_lulus,
            'program_studi'    => $request->program_studi,
            'foto'      => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Alumni berhasil diperbarui',
            'alumni' => $alumni
        ], 200);
    }

    public function delete($id)
    {
        $alumni = Alumni::find($id);

        if (!$alumni) {
            return response()->json([
                'status' => 'error',
                'message' => 'Alumni tidak ditemukan'
            ], 404);
        }

        if ($alumni->foto && File::exists(public_path($alumni->foto))) {
            File::delete(public_path($alumni->foto));
        }

        $alumni->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Alumni dan foto berhasil dihapus'
        ], 200);
    }

    public function deleteFoto(Request $request)
    {
        $alumni = Alumni::find($request->id);
        if (!$alumni) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

        if ($alumni->foto) {
            $fotoFullPath = $_SERVER['DOCUMENT_ROOT'].'/'.$alumni->foto;
            if (File::exists($fotoFullPath)) {
                File::delete($fotoFullPath);
            }
        }

        $alumni->foto = null;
        $alumni->save();

        return response()->json(['success' => true, 'message' => 'Foto berhasil dihapus']);
    }
}
