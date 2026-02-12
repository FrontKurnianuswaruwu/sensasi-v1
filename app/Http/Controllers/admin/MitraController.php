<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MitraController extends Controller
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
        return view('admin.mitra.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Mitra::select('id', 'nama_mitra', 'nama_admin', 'kontak','tahun_kerjasama');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('nama_mitra', 'like', "%{$search}%");
            });
        }

        // pagination
        $mitra = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $mitra->items(),
            'total' => $mitra->total(),
            'current_page' => $mitra->currentPage(),
            'last_page' => $mitra->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/mitra';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/mitra/' . $fotoName;
        } else {
            $fotoPath = $request->oldImage;
        }

        $mitra = Mitra::create([
            'nama_mitra'  => $request->name,
            'deskripsi' => $request->deskripsi,
            'kontak'  => $request->kontak, 
            'nama_admin'    => $request->nama_admin, 
            'link_website'    => $request->link_website, 
            'tahun_kerjasama'    => $request->tahun_kerjasama,
            'logo_url'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Mitra berhasil ditambahkan',
            'mitra' => $mitra
        ], 201);
    }

    public function show($id)
    {
        $mitra = Mitra::find($id);
        if (!$mitra) {
            return response()->json(['message' => 'Mitra tidak ditemukan'], 404);
        }

        return response()->json($mitra);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mitra = Mitra::findOrFail($id);

        if (!$mitra) {
            return response()->json(['message' => 'Mitra tidak ditemukan'], 404);
        }

        // default foto lama
        $fotoPath = $mitra->logo_url;

        if ($request->hasFile('foto')) {
            if ($mitra->logo_url) {
                $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$mitra->logo_url;
                if (file_exists($oldFoto)) {
                    unlink($oldFoto);
                }
            }

            $foto = $request->file('foto');
            $fotoName = time().'.'.$foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/mitra';

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $foto->move($destinationPath, $fotoName);

            $fotoPath = 'img/mitra/'.$fotoName;
        }

        $mitra->update([
            'nama_mitra'        => $request->name,
            'deskripsi' => $request->deskripsi,
            'logo_url'  => $fotoPath,
            'kontak'    => $request->kontak,
            'nama_admin'    => $request->nama_admin,
            'link_website'    => $request->link_website,
            'tahun_kerjasama'    => $request->tahun_kerjasama,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Mitra berhasil diperbarui',
            'mitra' => $mitra
        ], 200);
    }

    public function delete($id)
    {
        $mitra = Mitra::find($id);

        if (!$mitra) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mitra tidak ditemukan'
            ], 404);
        }

        $mitra->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Mitra berhasil dihapus'
        ], 200);
    }

    public function getdatauniversitas(Request $request)
    {
        $mitras = Mitra::select('id', 'nama_mitra')->get();

        return response()->json([
            'data' => $mitras
        ]);
    }
}
