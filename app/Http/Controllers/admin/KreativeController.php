<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kreative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class KreativeController extends Controller
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
        return view('admin.kreative.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $user = auth()->user(); 

        $query = Kreative::select('id', 'nama', 'deskripsi', 'status', 'user_id')
            ->withExists([
                'biodataMahasiswa as has_biodata' => function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                }
            ]);

        if ($user->role === 9) {
            $query->where('user_id', $user->id);
        }
    
        // Fitur pencarian
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        // Pagination
        $artikel = $query->paginate($limit, ['*'], 'page', $page);

        $data = collect($artikel->items())->map(function($item) use ($user) {
            $item->role = $user->role;
            return $item;
        });

        return response()->json([
            'data' => $data,
            'total' => $artikel->total(),
            'current_page' => $artikel->currentPage(),
            'last_page' => $artikel->lastPage()
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama'        => 'required|string|max:255',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pdfPath = null;

        if ($request->hasFile('pdf')) {
            $pdf      = $request->file('pdf');
            $pdfName  = time() . '.' . $pdf->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'pdf/artikel';
            $pdf->move($destinationPath, $pdfName);
            $pdfPath = 'pdf/artikel/' . $pdfName;
        } else {
            $pdfPath = $request->oldPdf;
        }

        $fotoPath = null;
        // simpan foto
        if (!empty($request->foto)) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = public_path('img/kreative');
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/kreative';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/kreative/' . $fotoName;
        } else {
            $fotoPath = $request->oldFoto;
        }

        $userid = auth()->user()->id;

        $artike = Kreative::create([
            'user_id'   => $userid,
            'nama'        => $request->nama,
            'deskripsi'  => $request->deskripsi, 
            'pdf'       => $pdfPath,
            'foto'      => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Artikel berhasil ditambahkan',
            'artike' => $artike
        ], 201);
    }

    public function show($id)
    {
        $artikel = Kreative::find($id);
        if (!$artikel) {
            return response()->json(['message' => 'Artikel tidak ditemukan'], 404);
        }

        return response()->json($artikel);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $artikel = Kreative::findOrFail($id);

        $pdfPath = $artikel->pdf;

        if ($request->hasFile('pdf')) {

            if ($artikel->pdf) {
                $oldPdf = $_SERVER['DOCUMENT_ROOT'].'/'.$artikel->pdf;
                if (file_exists($oldPdf)) {
                    unlink($oldPdf);
                }
            }

            $pdf = $request->file('pdf');
            $pdfName = time().'.'.$pdf->getClientOriginalExtension();
            $pdfDir = $_SERVER['DOCUMENT_ROOT'].'/pdf/artikel';

            if (!file_exists($pdfDir)) {
                mkdir($pdfDir, 0755, true);
            }

            $pdf->move($pdfDir, $pdfName);
            $pdfPath = 'pdf/artikel/'.$pdfName;
        }

        $fotoPath = $artikel->foto;

        if ($request->hasFile('foto')) {

            if ($artikel->foto) {
                $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$artikel->foto;
                if (file_exists($oldFoto)) {
                    unlink($oldFoto);
                }
            }

            $foto = $request->file('foto');
            $fotoName = time().'.'.$foto->getClientOriginalExtension();
            $fotoDir = $_SERVER['DOCUMENT_ROOT'].'/img/kreative';

            if (!file_exists($fotoDir)) {
                mkdir($fotoDir, 0755, true);
            }

            $foto->move($fotoDir, $fotoName);
            $fotoPath = 'img/kreative/'.$fotoName;
        }

        $artikel->update([
            'nama'      => $request->nama,
            'deskripsi' => $request->deskripsi,
            'pdf'       => $pdfPath,
            'foto'      => $fotoPath,
            'status'    => 'pending',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Artikel berhasil diperbarui',
            'artikel' => $artikel
        ], 200);
    }

    public function delete($id)
    {
        $artikel = Kreative::find($id);

        if (!$artikel) {
            return response()->json([
                'status' => 'error',
                'message' => 'Artikel tidak ditemukan'
            ], 404);
        }

        if ($artikel->pdf) {
            $pdfPath = $_SERVER['DOCUMENT_ROOT'].'/'.$artikel->pdf;
            if (file_exists($pdfPath)) {
                unlink($pdfPath);
            }
        }

        $artikel->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Artikel dan pdf berhasil dihapus'
        ], 200);
    }

    public function deletePdf(Request $request)
    {
        $artikel = Kreative::find($request->id);

        if (!$artikel) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }

        if ($artikel->pdf) {
            $pdfPath = $_SERVER['DOCUMENT_ROOT'].'/'.$artikel->pdf;
            if (file_exists($pdfPath)) {
                unlink($pdfPath);
            }
        }

        $artikel->pdf = null;
        $artikel->save();

        return response()->json([
            'success' => true,
            'message' => 'Pdf berhasil dihapus'
        ]);
    }

    public function approve($id)
    {
        $artikel = Kreative::find($id);
        if (!$artikel) {
            return response()->json(['message' => 'Artikel tidak ditemukan'], 404);
        }

        $artikel->status = 'approved';
        $artikel->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Artikel berhasil disetujui',
            'artikel' => $artikel
        ], 200);
    }

    public function reject($id)
    {
        $artikel = Kreative::find($id);
        if (!$artikel) {
            return response()->json(['message' => 'Artikel tidak ditemukan'], 404);
        }

        $artikel->status = 'rejected';
        $artikel->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Artikel berhasil ditolak',
            'artikel' => $artikel
        ], 200);
    }
}
