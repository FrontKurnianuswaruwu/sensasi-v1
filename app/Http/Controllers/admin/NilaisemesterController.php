<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AkademikMahasiswa;
use App\Models\NilaiSemester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use \App\Models\BiodataMahasiswa;

class NilaisemesterController extends Controller
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
        $userId = auth()->id();
        $mahasiswaid = BiodataMahasiswa::where('user_id', $userId)->value('id');
        return view('admin.nilaisemester.index', compact('nameuser', 'userstatus', 'mahasiswaid'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);
        $userId = $request->session()->get('user_id');
        $mahasiswaid = BiodataMahasiswa::where('user_id', $userId)->value('id');

        $query = NilaiSemester::select('id', 'semester', 'ip_semester', 'tahun_akademik_id', 'mahasiswa_id')
            ->where('mahasiswa_id', $mahasiswaid)
            ->with(['tahunakademik', 'mahasiswa']);

        $akademik = AkademikMahasiswa::select('mitra_id')->where('user_id', $userId)->first();


        // filter berdasarkan user_id
        if (!empty($userId)) {
            $query->whereHas('mahasiswa', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            });
        }

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where('tahun_akademik', 'like', "%{$search}%");
        }

        // pagination
        $nilai = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $nilai->items(),
            'total' => $nilai->total(),
            'current_page' => $nilai->currentPage(),
            'last_page' => $nilai->lastPage(),
            'akademik_mahasiswa' => $akademik,
        ]);
    }

    public function store(Request $request)
    {
        $userid = $request->session()->get('user_id');
        // Ambil mahasiswa_id dari request, bukan dari AkademikMahasiswa
        $mahasiswaid = $request->mahasiswa_id;
        $nilaisemester = NilaiSemester::where('mahasiswa_id', $mahasiswaid)
            ->where('semester', $request->semester)
            ->first();
        if ($nilaisemester) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Nilai semester untuk semester ini sudah ada'
            ], 409);
        }
        $validator = Validator::make($request->all(), [
            'semester'        => 'required',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/khs';
            $foto->move($destinationPath, $fotoName);
            $fotoPath = 'img/khs/' . $fotoName;
        } else {
            $fotoPath = $request->oldImage;
        }

        $nilaisemester = NilaiSemester::create([
            'semester'        => $request->semester,
            'tahun_akademik_id' => $request->tahun_akademik_id,
            'ip_semester'  => $request->ip_semester,
            'mahasiswa_id'  => $request->mahasiswa_id,
            'khs_file'       => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Nilai semster berhasil ditambahkan',
            'nilaisemester' => $nilaisemester
        ], 201);
    }

    public function show($id)
    {
        $nilai = NilaiSemester::find($id);
        if (!$nilai) {
            return response()->json(['message' => 'Nilai semester tidak ditemukan'], 404);
        }

        return response()->json($nilai);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'semester'        => 'required',
            'foto'      => 'nullable|image|mimes:jpg,jpeg,png,gif|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $nilai = NilaiSemester::findOrFail($id);

        // default foto lama
        $fotoPath = $nilai->foto;

        if ($request->hasFile('foto')) {
            // hapus foto lama kalau ada
            if ($nilai->foto) {
                unlink($_SERVER['DOCUMENT_ROOT'].'/'. $nilai->foto);
            }

            $foto      = $request->file('foto');
            $fotoName  = time() . '.' . $foto->getClientOriginalExtension();
            $destinationPath = $_SERVER['DOCUMENT_ROOT'].'/'.'img/khs';
            $foto->move($destinationPath, $fotoName);

            $fotoPath = 'img/khs/' . $fotoName;
        }

        $nilai->update([
            'semester'        => $request->semester,
            'tahun_akademik_id' => $request->tahun_akademik_id,
            'ip_semester'  => $request->ip_semester,
            'mahasiswa_id'  => $request->mahasiswa_id,
            'khs_file'      => $fotoPath,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Nilai semester berhasil diperbarui',
            'nilai' => $nilai
        ], 200);
    }

    public function delete($id)
    {
        $nilai = NilaiSemester::find($id);

        if (!$nilai) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nilai semester tidak ditemukan'
            ], 404);
        }

        if ($nilai->foto) {
            $oldFoto = $_SERVER['DOCUMENT_ROOT'].'/'.$nilai->foto;
            if (file_exists($oldFoto)) {
                unlink($oldFoto);
            }
        }

        $nilai->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Nilai semester dan foto berhasil dihapus'
        ], 200);
    }

    public function deleteFoto(Request $request)
    {
        $nilai = NilaiSemester::find($request->id);
        if (!$nilai) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan']);
        }

        if ($nilai->khs_file) {
            $oldFile = $_SERVER['DOCUMENT_ROOT'].'/'.$nilai->khs_file;
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }
        }

        $nilai->khs_file = null;
        $nilai->save();

        return response()->json(['success' => true, 'message' => 'Foto berhasil dihapus']);
    }
    
    public function getSemesterSebelumnya(Request $request)
    {
        $semesterInput = $request->query('semester'); // <- gunakan query() untuk GET

        $userId = $request->session()->get('user_id');

        $mahasiswaid = BiodataMahasiswa::where('user_id', $userId)->value('id');

        if (!$mahasiswaid) {
            return response()->json([
                'status' => false,
                'message' => 'Data mahasiswa tidak ditemukan'
            ], 404);
        }

        $semesterInput = (int) $semesterInput;

        $lastSemester = NilaiSemester::where('mahasiswa_id', $mahasiswaid)
            ->max('semester');

        if ($lastSemester && $semesterInput <= $lastSemester) {
            return response()->json([
                'status' => false,
                'message' => 'Tidak boleh memilih semester sebelumnya atau semester yang sama'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'Semester valid',
            'last_semester' => $lastSemester
        ], 200);
    }

}
