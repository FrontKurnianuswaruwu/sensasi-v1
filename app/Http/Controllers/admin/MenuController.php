<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
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
        return view('admin.menus.index', compact('nameuser', 'userstatus'));
    }

    public function getdata(Request $request)
    {
        $search = $request->input('search');
        $page   = $request->input('page', 1);
        $limit  = $request->input('limit', 10);

        $query = Menu::select('id', 'name', 'route', 'icon', 'is_parent', 'type');

        // filter search (kalau ada)
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // pagination
        $menus = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $menus->items(),
            'total' => $menus->total(),
            'current_page' => $menus->currentPage(),
            'last_page' => $menus->lastPage()
        ]);
    }

    public function getdatarole(Request $request)
    {
        $roles = Role::select('id', 'name')->get();

        return response()->json([
            'data' => $roles
        ]); 
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'route'   => 'nullable|string|max:255',
            'icon'    => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $menu = Menu::create([
            'name'      => $request->name,
            'route'     => $request->route,
            'icon'      => $request->icon,
            'type'      => $request->type,
            'is_parent' => $request->isparent,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Menu berhasil ditambahkan', 
            'menu' => $menu
        ], 201);
    }

    public function show($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['message' => 'Role tidak ditemukan'], 404);
        }

        return response()->json($menu);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['message' => 'Menu tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'route'   => 'nullable|string|max:255',
            'icon'    => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $menu->name = $request->name;
        $menu->route = $request->route;
        $menu->icon = $request->icon;
        $menu->type = $request->type;
        $menu->is_parent = $request->isparent;

        $menu->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data menu berhasil diupdate', 
            'menu' => $menu],
        200);
    }

    public function delete($id)
    {
        $employee = Menu::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu tidak ditemukan'
            ], 404);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data Menu berhasil dihapus'
        ], 200);
    }
}
