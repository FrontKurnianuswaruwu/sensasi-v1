<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pengajuandana;
use Illuminate\Http\Request;
use App\Models\BiodataMahasiswa;

class RiwayatpengajuandanaController extends Controller
{
    protected $nameuser;
    protected $userstatus;
    public function __construct()
    {
        $this->nameuser = auth()->user()->name;
        $this->userstatus = auth()->user()->status_user;
    }
    Public function index()
    {
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;
        return view('admin.riwayatpengajuandana.index', compact('nameuser', 'userstatus'));   
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $user = auth()->user();
        $loginRole    = $user->role;
        $loginMitraId = $user->mitra_id;

        // ambil mahasiswa login (jika ada)
        $mahasiswa = BiodataMahasiswa::where('user_id', $user->id)->first();

        $query = Pengajuandana::select(
                'id',
                'mahasiswa_id',
                'semester',
                'ip_semester',
                'nominal',
                'status',
                'total',
                'catatan'
            )
            ->with(['mahasiswa.user.akademik.mitra']);

        if ($loginRole == 9 && $mahasiswa) {
            $query->where('mahasiswa_id', $mahasiswa->id);
        }
        
        elseif (in_array($loginRole, [18, 19]) && $loginMitraId) {
            $query->whereHas('mahasiswa.user.akademik', function ($q) use ($loginMitraId) {
                $q->where('mitra_id', $loginMitraId);
            });
        }

        else {
            $query->where('status', '!=', 'Pending');
        }

        // Search
        if (!empty($search)) {
            $query->where('semester', 'like', "%{$search}%");
        }

        $query->orderBy('id', 'desc');

        $pengajuandana = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $pengajuandana->items(),
            'total' => $pengajuandana->total(),
            'current_page' => $pengajuandana->currentPage(),
            'last_page' => $pengajuandana->lastPage(),
            'role' => $loginRole
        ]);
    }

    public function show($id)
    {
        $pengajuandana = Pengajuandana::with('mahasiswa')->find($id);
        if (!$pengajuandana) {
            return response()->json(['message' => 'Pengajuan dana tidak ditemukan'], 404);
        }

        return response()->json($pengajuandana);
    }
}
