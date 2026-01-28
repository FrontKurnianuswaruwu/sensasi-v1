<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BiodataMahasiswa;

class PendaftaranpbsController extends Controller
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
        return view('admin.pendaftaranpbs.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $loginRole = auth()->user()->role;
        $loginMitraId = auth()->user()->mitra_id;
        

        $query = BiodataMahasiswa::select('user_id', 'nim')
            ->with('user.akademik.mitra')
            ->whereHas('user', function ($q) {
                $q->where('status_user', 'Verifikasi')
                ->where('role', 9);
            });

        if ($loginRole == 19) {

            $query->whereHas('user', function ($q) {
                $q->where('status_user', 'Verifikasi');
            });

            $query->whereHas('user.akademik', function ($q) use ($loginMitraId) {
                $q->where('mitra_id', $loginMitraId);
            });
        }

        if (!empty($search)) {
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // pagination
        $users = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $users->items(),
            'total' => $users->total(),
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage()
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
