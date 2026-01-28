<?php

namespace App\Http\Controllers\admin;

use App\Helpers\PermissionHelper;
use App\Http\Controllers\Controller;
use App\Models\BiodataMahasiswa;
use App\Models\Mitra;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
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
        $data['permissionAddUser'] = PermissionHelper::hasPermissionByPrefix(Auth::user()->role, 'Add');
        $data['permissionEditUser'] = PermissionHelper::hasPermissionByPrefix(Auth::user()->role, 'Edit');
        $data['permissionDeleteUser'] = PermissionHelper::hasPermissionByPrefix(Auth::user()->role, 'Delete');
        $nameuser = $this->nameuser;
        $userstatus = $this->userstatus;

        return view('admin.user.index',['data' => $data], compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = User::select('id', 'name', 'email', 'status_user')->with('biodataMahasiswa');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'status' => 'required|in:Aktif,Tidak Aktif',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employee = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status_user' => $request->status,
            'user_id' => $request->user_id,
            'email_verified_at'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User berhasil ditambahkan', 
            'employee' => $employee
        ], 201);
    }

    // Update existing employee
    public function update(Request $request, $id)
    {
        $employee = User::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Karyawan tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'status' => 'required|in:Aktif,Tidak Aktif',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->status_user = $request->status;
        $employee->role = $request->role;
        $employee->mitra_id = $request->mitra_id;

        if ($request->filled('password')) {
            $employee->password = Hash::make($request->password);
        }

        $employee->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diupdate', 
            'employee' => $employee],
        200);
    }

    public function show($id)
    {
        $employee = User::with('biodataMahasiswa')->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Karyawan tidak ditemukan'], 404);
        }

        return response()->json($employee);
    }

    public function delete($id)
    {
        $employee = User::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Karyawan tidak ditemukan'
            ], 404);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil dihapus'
        ], 200);
    }

    public function getmitra()
    {
        $mitras = Mitra::select('id', 'nama_mitra')->get();

        return response()->json([
            'data' => $mitras
        ]);
    }


}
