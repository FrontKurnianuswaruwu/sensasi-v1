<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Sejarah;
use App\Models\SejarahFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SejarahController extends Controller
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
        return view('admin.sejarah.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Sejarah::select('id', 'deskripsi');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('deskripsi', 'like', "%{$search}%");
            });
        }

        // pagination
        $sejarah = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $sejarah->items(),
            'total' => $sejarah->total(),
            'current_page' => $sejarah->currentPage(),
            'last_page' => $sejarah->lastPage()
        ]);
    }

    public function show($id)
    {
        $sejarah = Sejarah::with('fotos')->findOrFail($id);
        if (!$sejarah) {
            return response()->json(['message' => 'Sejarah tidak ditemukan'], 404);
        }

        return response()->json($sejarah);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'deskripsi' => 'nullable|string',
            'foto.*'    => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $sejarah = Sejarah::findOrFail($id);

        $sejarah->update([
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->hasFile('foto')) {

            foreach ($sejarah->fotos as $oldFoto) {
                $oldPath = $_SERVER['DOCUMENT_ROOT'].'/'.$oldFoto->foto;
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
                $oldFoto->delete();
            }

            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/img/sejarah';
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            foreach ($request->file('foto') as $file) {
                $fotoName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();
                $file->move($destinationPath, $fotoName);

                SejarahFoto::create([
                    'sejarah_id' => $sejarah->id,
                    'foto'       => 'img/sejarah/'.$fotoName,
                ]);
            }
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Sejarah berhasil diperbarui',
            'sejarah' => $sejarah->load('fotos')
        ], 200);
    }
}
