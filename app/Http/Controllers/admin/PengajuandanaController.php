<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\BiodataMahasiswa;
use App\Models\NilaiSemester;
use App\Models\Pengajuandana;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PengajuandanaController extends Controller
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
        $userId = auth()->id();

        $mahasiswa = BiodataMahasiswa::where('user_id', $userId)->first();

        $query = Pengajuandana::select('id', 'semester', 'ip_semester', 'nominal', 'status','total')
            ->with(['mahasiswa']);

        if ($mahasiswa) {
            $query->where('mahasiswa_id', $mahasiswa->id);
        }
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        return view('admin.pengajuandana.index', [
            'is_mahasiswa' => $mahasiswa ? true : false,
            'nameuser' => $nameuser,
            'userstatus' => $userstatus
        ]);
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $userId = auth()->id();

        // cek apakah user ini ada di tabel biodata_mahasiswa
        $mahasiswa = BiodataMahasiswa::where('user_id', $userId)->first();

        // base query
        $query = Pengajuandana::select('id', 'semester', 'ip_semester', 'nominal', 'status','total', 'mahasiswa_id', 'catatan')
            ->with(['mahasiswa.user']);

        // jika user punya data biodata_mahasiswa → tampilkan data dia saja
        if ($mahasiswa) {
            $query->where('mahasiswa_id', $mahasiswa->id);
            $query->where('status', '!=', 'approved');
        }

        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('semester', 'like', "%{$search}%");
            });
        }

        $pengajuandana = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pengajuandana->items(),
            'total' => $pengajuandana->total(),
            'current_page' => $pengajuandana->currentPage(),
            'last_page' => $pengajuandana->lastPage(),
            'is_mahasiswa' => $mahasiswa ? true : false
        ]);
    }

    public function getIpSebelumnya(Request $request)
    {
        $semester = $request->input('semester');
        $userid = $request->session()->get('user_id');
        $idmahasiswa = BiodataMahasiswa::where('user_id', $userid)->value('id');

        $pengajuandana = Pengajuandana::where('mahasiswa_id', $idmahasiswa)
                        ->where('semester', $semester)
                        ->first();
        
        if ($pengajuandana) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengajuan dana untuk semester ini sudah ada.'
            ]);
        }
        

        if (!$semester || !$idmahasiswa) {
            return response()->json([
                'status' => 'error',
                'message' => 'Semester atau Mahasiswa tidak ditemukan.'
            ]);
        }

        $ipSebelumnya = NilaiSemester::where('mahasiswa_id', $idmahasiswa)
                        ->where('semester', $semester - 1)
                        ->value('ip_semester');

        if (!$ipSebelumnya) {
            return response()->json([
                'status' => 'error',
                'message' => 'IP Semester sebelumnya tidak ditemukan.'
            ]);
        }

        return response()->json(['ip' => $ipSebelumnya]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pengajuandanaSemester' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mahasiswa_id = BiodataMahasiswa::where('user_id', $request->session()->get('user_id'))->value('id');

        $pengajuandana = Pengajuandana::create([
            'mahasiswa_id'  => $mahasiswa_id,
            'semester'        => $request->pengajuandanaSemester,
            'ip_semester' => $request->pengajuandanaIpsemester,
            'spp_tetap'  => $request->spp_tetap, 
            'spp_variabel' => $request->spp_variabel,
            'praktikum' => !empty($request->praktikumPaket) && $request->praktikumPaket != 0
                            ? $request->praktikumPaket
                            : $request->praktikum,
            'jml_sks'       => $request->jml_sks,
            'nominal'       => $request->nominal,
            'total' => !empty($request->totalpaket) ?? $request->totalpaket != 0
                            ? $request->totalpaket
                            : $request->totalsks,
            'tipe'         => $request->pengajuandanaPengajuandana,
            'status'       => 'pending',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pengajuan dana berhasil ditambahkan',
            'pengajuandana' => $pengajuandana
        ], 201);
    }

    public function show($id)
    {
        $pengajuandana = Pengajuandana::with('mahasiswa')->find($id);
        if (!$pengajuandana) {
            return response()->json(['message' => 'Pengajuan dana tidak ditemukan'], 404);
        }

        return response()->json($pengajuandana);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'pengajuandanaSemester' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengajuandana = Pengajuandana::findOrFail($id);


        $pengajuandana->update([
            'semester'        => $request->pengajuandanaSemester,
            'ip_semester' => $request->pengajuandanaIpsemester,
            'spp_tetap'  => $request->spp_tetap, 
            'spp_variabel' => $request->spp_variabel,
            'praktikum' => !empty($request->praktikumPaket) && $request->praktikumPaket != 0
                            ? $request->praktikumPaket
                            : $request->praktikum,
            'jml_sks'       => $request->jml_sks,
            'nominal'       => $request->nominal,
            'total' => !empty($request->totalpaket) ?? $request->totalpaket != 0
                            ? $request->totalpaket
                            : $request->totalsks,
            'tipe'         => $request->pengajuandanaPengajuandana,
            'status'       => 'pending',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Pengajuan dana berhasil diperbarui',
            'pengajuandana' => $pengajuandana
        ], 200);
    }

    public function delete($id)
    {
        $pengajuandana = Pengajuandana::find($id);

        if (!$pengajuandana) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengajuan dana tidak ditemukan'
            ], 404);
        }

        $pengajuandana->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Pengajuan dana dan foto berhasil dihapus'
        ], 200);
    }

    public function approve(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nominal_disetujui' => 'required|numeric',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengajuandana = Pengajuandana::find($id);

        if (!$pengajuandana) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengajuan dana tidak ditemukan'
            ], 404);
        }

        $pengajuandana->update([
            'nominal_disetujui' => $request->nominal_disetujui,
            'catatan' => $request->catatan,
            'status' => 'approved',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pengajuan dana berhasil disetujui',
            'pengajuandana' => $pengajuandana
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'catatan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengajuandana = Pengajuandana::find($id);

        if (!$pengajuandana) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengajuan dana tidak ditemukan'
            ], 404);
        }

        $pengajuandana->update([
            'catatan' => $request->catatan,
            'status' => 'rejected',
            'nominal_disetujui' => null,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pengajuan dana berhasil ditolak',
            'pengajuandana' => $pengajuandana
        ], 200);
    }

    public function detailPengajuanDana($id)
    {
        $pengajuandana = Pengajuandana::find($id);
        if (!$pengajuandana) {
            return response()->json(['message' => 'Pengajuan dana tidak ditemukan'], 404);
        }

        return response()->json($pengajuandana);
    }
    

}
