<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Herophoto;
use App\Models\Herosection;
use Illuminate\Http\Request;

class HerosectionController extends Controller
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
        $isExists = Herosection::exists();
        return view('admin.herosection.index', compact('isExists', 'nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Herosection::select('id', 'name', 'deskripsi');

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

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
        $request->validate([
            'name' => 'required',
            'deskripsi' => 'required',
        ]);

        $hero = HeroSection::create([
            'name' => $request->name,
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->hasFile('gambar')) {
            foreach ($request->file('gambar') as $file) {
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move($_SERVER['DOCUMENT_ROOT'].'/uploads/herosection/', $filename);

                Herophoto::create([
                    'hero_id' => $hero->id,
                    'foto' => $filename
                ]);
            }
        }

        return response()->json([
            "status" => "success",
            "message" => "Hero Section berhasil disimpan!"
        ]);
    }

    public function show($id)
    {
        $hero = Herosection::with('herophotos')->findOrFail($id);

        return response()->json([
            'data' => $hero
        ]);
    }

    public function deletePhoto($id)
    {
        $photo = Herophoto::find($id);
        if (!$photo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Foto tidak ditemukan'
            ], 404);
        }

        // Hapus file fisik
        $filePath = public_path('uploads/herosection/' . $photo->foto);
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        // Hapus data dari database
        $photo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Foto berhasil dihapus'
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'deskripsi' => 'required',
        ]);

        $hero = Herosection::findOrFail($id);
        $hero->update([
            'name' => $request->name,
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->hasFile('gambar')) {
            foreach ($request->file('gambar') as $file) {
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move($_SERVER['DOCUMENT_ROOT'].'/uploads/herosection/', $filename);

                Herophoto::create([
                    'hero_id' => $hero->id,
                    'foto' => $filename
                ]);
            }
        }

        return response()->json([
            "status" => "success",
            "message" => "Hero Section berhasil diperbarui!"
        ]);
    }
}
