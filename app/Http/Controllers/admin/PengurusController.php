<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pengurus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PengurusController extends Controller
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
        return view('admin.pengurus.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Pengurus::select('id', 'nama', 'jabatan');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
            $q->where('nama', 'like', "%{$search}%")
              ->orWhere('jabatan', 'like', "%{$search}%");
            });
        }

        // pagination
        $pengurus = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pengurus->items(),
            'total' => $pengurus->total(),
            'current_page' => $pengurus->currentPage(),
            'last_page' => $pengurus->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/pengurus';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/pengurus/' . $fotoName;
        } else {
            $fotoPath = $request->oldFoto;
        }

        $pengurus = Pengurus::create([
            'nama'        => $request->nama,
            'jabatan' => $request->jabatan,
            'biodata'  => $request->biodata, 
            'foto'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pengurus berhasil ditambahkan',
            'pengurus' => $pengurus
        ], 201);
    }

    public function show($id)
    {
        $pengurus = Pengurus::find($id);
        if (!$pengurus) {
            return response()->json(['message' => 'Pengurus tidak ditemukan'], 404);
        }

        return response()->json($pengurus);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengurus = Pengurus::findOrFail($id);

        $fotoPath = $pengurus->foto;

        if ($request->hasFile('foto')) {
            if ($pengurus->foto) {
                $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$pengurus->foto;
                if (file_exists($oldFoto)) {
                    unlink($oldFoto);
                }
            }

            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.('img/pengurus');
            $foto->move($destinationPath, $fotoName);

            $fotoPath = 'img/pengurus/' . $fotoName;
        }

        $pengurus->update([
            'nama'        => $request->nama,
            'jabatan' => $request->jabatan,
            'biodata'  => $request->biodata,
            'foto'      => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pengurus berhasil diperbarui',
            'pengurus' => $pengurus
        ], 200);
    }

    public function delete($id)
    {
        $pengurus = Pengurus::find($id);

        if (!$pengurus) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengurus tidak ditemukan'
            ], 404);
        }

        if ($pengurus->foto) {
            $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$pengurus->foto;
            if (file_exists($oldFoto)) {
                unlink($oldFoto);
            }
        }

        $pengurus->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Pengurus dan foto berhasil dihapus'
        ], 200);
    }

    public function deleteFoto(Request $request)
    {
        $pengurus = Pengurus::find($request->id);
        if (!$pengurus) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

        if ($pengurus->foto ) {
            $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$pengurus->foto;
            if (file_exists($oldFoto)) {
                unlink($oldFoto);
            }
        }

        $pengurus->foto = null;
        $pengurus->save();

        return response()->json(['success' => true, 'message' => 'Foto berhasil dihapus']);
    }
}
