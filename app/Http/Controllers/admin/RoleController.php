<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
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
        return view('admin.roles.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Role::select('id', 'name');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $roles = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $roles->items(),
            'total' => $roles->total(),
            'current_page' => $roles->currentPage(),
            'last_page' => $roles->lastPage()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employee = Role::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Role berhasil ditambahkan', 
            'employee' => $employee
        ], 201);
    }

    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role tidak ditemukan'], 404);
        }

        return response()->json($role);
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $role->name = $request->name;

        $role->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data role berhasil diupdate', 
            'role' => $role],
        200);
    }

    public function delete($id)
    {
        $employee = Role::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Role tidak ditemukan'
            ], 404);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data role berhasil dihapus'
        ], 200);
    }
}
