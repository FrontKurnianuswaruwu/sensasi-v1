<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Permission;
use App\Models\Submenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SubmenuController extends Controller
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
        return view('admin.submenus.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Submenu::select('id', 'name', 'route', 'icon', 'type_menu', 'type', 'menu_id');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $submenu = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $submenu->items(),
            'total' => $submenu->total(),
            'current_page' => $submenu->currentPage(),
            'last_page' => $submenu->lastPage()
        ]);
    }

    public function getdatamenu()
    {
        $menus = Menu::select('id', 'name')->get();
        return response()->json($menus);
    }

    public function store(Request $request)
    {
        // Simpan submenu dulu
        $submenu = Submenu::create([
            'name'      => $request->name,
            'route'     => $request->route,
            'icon'      => $request->icon,
            'is_parent' => $request->is_parent,
            'type_menu' => $request->type_menu,
            'type'      => $request->type,
            'menu_id'   => $request->menu_id,
        ]);

        // Hitung groupby terakhir (increment otomatis)
        $lastGroup = Permission::max('groupby');
        $groupby = $lastGroup ? $lastGroup + 1 : 1;

        // Data default permission
        $permissions = [
            ['name' => $request->name, 'slug' => $request->name],
            ['name' => 'View ' . $request->name, 'slug' => 'View ' . $request->name],
            ['name' => 'Add ' . $request->name, 'slug' => 'Add ' . $request->name],
            ['name' => 'Edit ' . $request->name, 'slug' => 'Edit ' . $request->name],
            ['name' => 'Delete ' . $request->name, 'slug' => 'Delete ' . $request->name],
        ];

        foreach ($permissions as $perm) {
            Permission::create([
                'submenu_id' => $submenu->id,
                'name'       => $perm['name'],
                'slug'       => Str::slug($perm['slug'], '-'),
                'groupby'    => $groupby,
            ]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Submenu berhasil ditambahkan',
            'submenu' => $submenu
        ], 201);
    }

    public function show($id)
    {
        $submenu = Submenu::find($id);
        if (!$submenu) {
            return response()->json(['message' => 'Submenu tidak ditemukan'], 404);
        }

        return response()->json($submenu);
    }

    public function update(Request $request, $id)
    {
        $submenu = Submenu::find($id);
        if (!$submenu) {
            return response()->json(['message' => 'Submenu tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'route'   => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $submenu->name = $request->name;
        $submenu->route = $request->route;
        $submenu->icon = $request->icon;
        $submenu->type = $request->type;
        $submenu->menu_id = $request->menu_id;
        $submenu->type_menu = $request->type_menu;
        $submenu->save();

        // Update permissions name & slug
        $permissions = $submenu->permissions;
        foreach ($permissions as $permission) {
            if (Str::startsWith($permission->name, 'View ')) {
                $permission->name = 'View ' . $request->name;
                $permission->slug = Str::slug('View ' . $request->name, '-');
            } elseif (Str::startsWith($permission->name, 'Add ')) {
                $permission->name = 'Add ' . $request->name;
                $permission->slug = Str::slug('Add ' . $request->name, '-');
            } elseif (Str::startsWith($permission->name, 'Edit ')) {
                $permission->name = 'Edit ' . $request->name;
                $permission->slug = Str::slug('Edit ' . $request->name, '-');
            } elseif (Str::startsWith($permission->name, 'Delete ')) {
                $permission->name = 'Delete ' . $request->name;
                $permission->slug = Str::slug('Delete ' . $request->name, '-');
            } else {
                $permission->name = $request->name;
                $permission->slug = Str::slug($request->name, '-');
            }
            $permission->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data submenu berhasil diupdate',
            'submenu' => $submenu
        ], 200);
    }

    public function delete($id)
    {
        $submenu = Submenu::find($id);

        if (!$submenu) {
            return response()->json([
                'status' => 'error',
                'message' => 'Submenu tidak ditemukan'
            ], 404);
        }

        $submenu->permissions()->delete();

        $submenu->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Submenu berhasil dihapus'
        ], 200);
    }
}
