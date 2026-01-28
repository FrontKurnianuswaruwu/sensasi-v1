<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BeritaController extends Controller
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
        return view('admin.berita.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Berita::select('id', 'judul', 'ketegori', 'tanggal');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%")
              ->orWhere('ketegori', 'like', "%{$search}%");
            });
        }

        // pagination
        $berita = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $berita->items(),
            'total' => $berita->total(),
            'current_page' => $berita->currentPage(),
            'last_page' => $berita->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'img/berita';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/berita/' . $fotoName;
        } else {
            $fotoPath = $request->oldFoto;
        }

        $berita = Berita::create([
            'judul'        => $request->judul,
            'ketegori' => $request->kategori,
            'tanggal'  => $request->tanggal, 
            'deskripsi'  => $request->deskripsi, 
            'foto'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Berita berhasil ditambahkan',
            'berita' => $berita
        ], 201);
    }

    public function show($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        }

        return response()->json($berita);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'foto'  => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $berita = Berita::findOrFail($id);

        $fotoPath = $berita->foto; 

        if ($request->hasFile('foto')) {
            if ($berita->foto) {
                $fotoFullPath = $_SERVER['DOCUMENT_ROOT'].'/'.$berita->foto;
                if (file_exists($fotoFullPath)) {
                    unlink($fotoFullPath);
                }
            }

            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/berita';
            $foto->move($destinationPath, $fotoName);

            $fotoPath = 'img/berita/' . $fotoName;
        }

        $berita->update([
            'judul'      => $request->judul,
            'kategori'   => $request->kategori,
            'deskripsi'  => $request->deskripsi,
            'tanggal'    => $request->tanggal,
            'foto'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Berita berhasil diperbarui',
            'berita'  => $berita
        ], 200);
    }

    public function delete($id)
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json([
                'status' => 'error',
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        if ($berita->foto) {
            $fotoFullPath = $_SERVER['DOCUMENT_ROOT'].'/'.$berita->foto;
            if (File::exists($fotoFullPath)) {
                File::delete($fotoFullPath);
            }
        }

        $berita->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Berita dan foto berhasil dihapus'
        ], 200);
    }

    public function deleteFoto(Request $request)
    {
        $berita = Berita::find($request->id);

        if (!$berita) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }

        if ($berita->foto) {
            $fotoFullPath = $_SERVER['DOCUMENT_ROOT'].'/'.$berita->foto;
            if (File::exists($fotoFullPath)) {
                File::delete($fotoFullPath);
            }
        }

        $berita->foto = null;
        $berita->save();

        return response()->json([
            'success' => true,
            'message' => 'Foto berhasil dihapus'
        ]);
    }

}
