<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\BiodataMahasiswa;
use App\Models\Sensasiclub;
use Illuminate\Http\Request;

class SensasiclubController extends Controller
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
        return view('admin.sensasiclub.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Sensasiclub::select('mahasiswa_id', 'judul', 'deskripsi', 'jenis', 'id')->with('mahasiswa.user', 'mahasiswa.mitra');

        if (!empty($search)) {
            $query->whereHas('mahasiswa.user', function ($q) use ($search) {
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

    public function getmahasiswa(Request $request)
    {
        $usedMahasiswaIds = Sensasiclub::pluck('mahasiswa_id')->toArray();

        $mahasiswa = BiodataMahasiswa::select('id', 'user_id')
            ->with('user:id,name')
            ->get();

        return response()->json($mahasiswa);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mahasiswa_id' => 'required|exists:biodata_mahasiswa,id',
            'judul'        => 'required|string|max:255',
            'jenis'        => 'required|in:artikel,youtube',
            'link_youtube' => 'nullable|string|max:255',
            'pdf'          => 'nullable|file|mimes:pdf|max:2048',
            'foto'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'deskripsi'    => 'nullable|string',
        ]);

        $sensasiclub = new Sensasiclub();
        $sensasiclub->mahasiswa_id = $request->mahasiswa_id;
        $sensasiclub->judul        = $request->judul;
        $sensasiclub->jenis        = $request->jenis;
        $sensasiclub->link_youtube = $request->link_youtube;
        $sensasiclub->deskripsi    = $request->deskripsi;

        if ($request->hasFile('pdf')) {
            $pdf     = $request->file('pdf');
            $pdfName = time() . '_' . $pdf->getClientOriginalName();
            $pdf->move(public_path('uploads/sensasiclub'), $pdfName);
            $sensasiclub->pdf = 'uploads/sensasiclub/' . $pdfName;
        }

        if ($request->hasFile('foto')) {
            $foto     = $request->file('foto');
            $fotoName = time() . '_' . uniqid() . '.' . $foto->getClientOriginalExtension();
            $foto->move(public_path('img/sensasiclub'), $fotoName);
            $sensasiclub->foto = 'img/sensasiclub/' . $fotoName;
        }

        $sensasiclub->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Sensasi Club entry created successfully.'
        ], 201);
    }

    public function show($id)
    {
        $sensasiclub = Sensasiclub::find($id);
        if (!$sensasiclub) {
            return response()->json(['message' => 'Sensasi Club entry not found'], 404);
        }

        return response()->json($sensasiclub);
    }

    public function update(Request $request, $id)
    {
        $sensasiclub = Sensasiclub::find($id);
        if (!$sensasiclub) {
            return response()->json(['message' => 'Sensasi Club entry not found'], 404);
        }

        $request->validate([
            'mahasiswa_id' => 'required|exists:biodata_mahasiswa,id',
            'judul' => 'required|string|max:255',
            'jenis' => 'required|in:artikel,youtube',
            'link_youtube' => 'nullable|string|max:255',
            'pdf' => 'nullable|file|mimes:pdf|max:2048',
            'deskripsi' => 'nullable|string',
        ]);

        $sensasiclub->mahasiswa_id = $request->mahasiswa_id;
        $sensasiclub->judul = $request->judul;
        $sensasiclub->jenis = $request->jenis;
        $sensasiclub->link_youtube = $request->link_youtube;
        $sensasiclub->deskripsi = $request->deskripsi;

        if ($request->hasFile('pdf')) {
            if ($sensasiclub->pdf) {
                $oldPdf = $_SERVER['DOCUMENT_ROOT'].'/'.$sensasiclub->pdf;
                if (file_exists($oldPdf)) {
                    unlink($oldPdf);
                }
            }

            $pdfFile = $request->file('pdf');
            $pdfPath = time() . '_' . $pdfFile->getClientOriginalName();
            $pdfFile->move($_SERVER['DOCUMENT_ROOT'].'/uploads/sensasiclub', $pdfPath);
            $pdfFilename = 'uploads/sensasiclub/' . $pdfPath;
            $sensasiclub->pdf = $pdfFilename;
        }

        if ($request->hasFile('foto')) {
            if ($sensasiclub->foto) {
                $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$sensasiclub->foto;
                if (file_exists($oldFoto)) {
                    unlink($oldFoto);
                }
            }
            $fotoFile = $request->file('foto');
            $fotoPath = time() . '_' . uniqid() . '.' . $fotoFile->getClientOriginalExtension();
            $fotoFile->move(public_path('img/sensasiclub'), $fotoPath);
            $sensasiclub->foto = 'img/sensasiclub/' . $fotoPath;
        }

        $sensasiclub->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Sensasi Club berhasil diupdate.'
        ]);
    }

    public function delete($id)
    {
        $sensasiclub = Sensasiclub::find($id);
        if (!$sensasiclub) {
            return response()->json(['message' => 'Sensasi Club entry not found'], 404);
        }

        if ($sensasiclub->pdf) {
            $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$sensasiclub->pdf;
            if (file_exists($oldFoto)) {
                unlink($oldFoto);
            }
        }

        $sensasiclub->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Sensasi Club berhasil di hapus.'
        ]);
    }

    public function deletePdf(Request $request)
    {
        $id = $request->input('id');
        $sensasiclub = Sensasiclub::find($id);

        if (!$sensasiclub) {
            return response()->json([
                'status' => 'error',
                'message' => 'Entry tidak ditemukan'
            ], 404);
        }

        if ($sensasiclub->pdf) {
            $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$sensasiclub->pdf;
            if (file_exists($oldFoto)) {
                unlink($oldFoto);
            }
        }

        $sensasiclub->pdf = null;
        $sensasiclub->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Pdf berhasil dihapus'
        ]);
    }
}
