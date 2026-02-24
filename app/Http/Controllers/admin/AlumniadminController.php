<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\BiodataMahasiswa;
use App\Models\Alumni;
use Illuminate\Http\Request;

class AlumniadminController extends Controller
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
        return view('admin.alumniadmin.index', compact('nameuser', 'userstatus'));
    }
    public function getdata(Request $request)
{
    $search = $request->input('search');
    $page   = $request->input('page', 1);
    $limit  = $request->input('limit', 10);

    $loginRole = auth()->user()->role;
    $loginMitraId = auth()->user()->mitra_id;

    // --- 1. Query Alumni Transisi (Dari BiodataMahasiswa) ---
    $queryMhs = BiodataMahasiswa::with(['user.akademik.mitra'])
        ->whereHas('user', function ($q) {
            $q->where('status_user', 'Tidak Aktif')->where('role', 9);
        });

    // --- 2. Query Alumni Resmi (Dari Tabel Alumni) ---
    $queryAlumni = Alumni::with('mitra');

    // Filter Berdasarkan Mitra (Role 19)
    if ($loginRole == 19) {
        $queryMhs->whereHas('user.akademik', function ($q) use ($loginMitraId) {
            $q->where('mitra_id', $loginMitraId);
        });
        $queryAlumni->where('mitra_id', $loginMitraId);
    }

    // Filter Search
    if (!empty($search)) {
        $queryMhs->whereHas('user', function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%");
        });
        $queryAlumni->where('nama_lengkap', 'like', "%{$search}%");
    }

    // Ambil Data & Tandai Sumbernya
    $dataMhs = $queryMhs->get()->map(function($item) {
        $item->sumber_data = 'transisi';
        return $item;
    });

    $dataAlumni = $queryAlumni->get()->map(function($item) {
        $item->sumber_data = 'resmi';
        return $item;
    });

    // Gabungkan (Merge) dan Bungkus dengan Pagination Manual
    $combined = $dataMhs->concat($dataAlumni)->sortByDesc('created_at');
    
    $total = $combined->count();
    $items = $combined->forPage($page, $limit)->values();

    return response()->json([
        'data'         => $items,
        'total'        => $total,
        'current_page' => (int)$page,
        'last_page'    => ceil($total / $limit)
    ]);
}

    public function confirmpbsaktif($id)
    {
        $user = BiodataMahasiswa::where('user_id', $id)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.'
            ], 404);
        }

        $user->user->status_user = 'Aktif';
        $user->user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil ubah alumni jadi pbsaktif.'
        ]);
    }
}
