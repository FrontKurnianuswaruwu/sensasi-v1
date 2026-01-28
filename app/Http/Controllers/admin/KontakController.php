<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KontakController extends Controller
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
        return view('admin.kontak.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Kontak::select('id', 'alamat', 'nomor', 'email','maps');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('alamat', 'like', "%{$search}%");
            });
        }

        // pagination
        $kontak = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $kontak->items(),
            'total' => $kontak->total(),
            'current_page' => $kontak->currentPage(),
            'last_page' => $kontak->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'alamat'        => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kontak = Kontak::create([
            'alamat'  => $request->alamat,
            'nomor' => $request->nomor,
            'email'  => $request->email, 
            'maps'    => $request->maps, 
            'instagram'    => $request->instagram, 
            'facebook'    => $request->facebook, 
            'twitter'    => $request->twitter,
            'linkedin'    => $request->linkedin,
            'youtube'    => $request->youtube,
            'tiktok'    => $request->tiktok,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Kontak berhasil ditambahkan',
            'kontak' => $kontak
        ], 201);
    }

    public function show($id)
    {
        $kontak = Kontak::find($id);
        if (!$kontak) {
            return response()->json(['message' => 'Kontak tidak ditemukan'], 404);
        }

        return response()->json($kontak);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'alamat'        => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kontak = Kontak::findOrFail($id);

        if (!$kontak) {
            return response()->json(['message' => 'Kontak tidak ditemukan'], 404);
        }

        $kontak->update([
            'alamat'        => $request->alamat,
            'nomor' => $request->nomor,
            'email'  => $request->email,
            'maps'    => $request->maps,
            'instagram'    => $request->instagram,
            'facebook'    => $request->facebook,
            'twitter'    => $request->twitter,
            'linkedin'    => $request->linkedin,
            'youtube'    => $request->youtube,
            'tiktok'    => $request->tiktok,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Kontak berhasil diperbarui',
            'kontak' => $kontak
        ], 200);
    }

    public function delete($id)
    {
        $kontak = Kontak::find($id);

        if (!$kontak) {
            return response()->json([
                'status' => 'error',
                'message' => 'Kontak tidak ditemukan'
            ], 404);
        }

        $kontak->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Kontak berhasil dihapus'
        ], 200);
    }
}
