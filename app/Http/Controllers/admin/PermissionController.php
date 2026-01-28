<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\Submenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PermissionController extends Controller
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
        $permissions = Permission::with(['submenu'])
            ->orderBy('groupby')
            ->get()
            ->groupBy('groupby');

        $permissionRoles = PermissionRole::select('permission_id','role_id')->get()
            ->map(function($item){
                return $item->permission_id.'-'.$item->role_id;
            })->toArray();

        return view('admin.permissions.index', compact('permissions','permissionRoles', 'nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Permission::select('id', 'name', 'slug', 'submenu_id')->with(['submenu:id,name']);

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $permission = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $permission->items(),
            'total' => $permission->total(),
            'current_page' => $permission->currentPage(),
            'last_page' => $permission->lastPage()
        ]);
    }

    public function getdatasubmenu()
    {
        $submenus = Submenu::select('id', 'name')->get();
        return response()->json($submenus);
    }

    public function store(Request $request)
    {
        $permissionId = $request->permission_id;
        $roleId = $request->role_id;

        if ($request->checked) {
            // Cek dulu kalau sudah ada jangan double insert
            $exists = PermissionRole::where('permission_id', $permissionId)
                                    ->where('role_id', $roleId)
                                    ->first();

            if (!$exists) {
                PermissionRole::create([
                    'permission_id' => $permissionId,
                    'role_id' => $roleId,
                ]);
            }

            return response()->json(['message' => 'PermissionRole berhasil ditambahkan']);
        } else {
            // Kalau di-uncheck → hapus
            PermissionRole::where('permission_id', $permissionId)
                          ->where('role_id', $roleId)
                          ->delete();

            return response()->json(['message' => 'PermissionRole berhasil dihapus']);
        }
    }
}
