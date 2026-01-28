@extends('layouts.admin')
@section('title', 'Data Permission')
@section('content')

<meta name="csrf-token" content="{{ csrf_token() }}">
<div id="notificationWrapper" class="fixed top-4 right-4 flex flex-col gap-2 z-[9999]"></div>

<main class="flex-1 lg:ml-0 overflow-x-hidden">
    <div class="p-4 lg:p-8">
        <div class="mb-8 fade-in flex items-center justify-between">
            <!-- Judul -->
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                Data Permission
            </h2>

            <!-- Breadcrumb -->
            <nav class="text-sm text-gray-500" aria-label="Breadcrumb">
                <ol class="list-reset flex">
                    <li><span class="text-gray-700">Data Permission</span></li>
                    <li><span class="mx-2">/</span></li>
                    <li><span class="text-gray-500">List</span></li>
                </ol>
            </nav>
        </div>

        <!-- Table Permission -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden fade-in">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r gradient-bg to-blue-light text-white">
                        <tr>
                            <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">No</th>
                            <th class="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider">Menu</th>
                            <th class="px-6 py-5 text-center text-sm font-semibold uppercase tracking-wider">View</th>
                            <th class="px-6 py-5 text-center text-sm font-semibold uppercase tracking-wider">Add</th>
                            <th class="px-6 py-5 text-center text-sm font-semibold uppercase tracking-wider">Edit</th>
                            <th class="px-6 py-5 text-center text-sm font-semibold uppercase tracking-wider">Delete</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach($permissions as $group => $perms)
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $loop->iteration }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <div class="h-10 w-10 rounded-full bg-gradient-to-r gradient-bg to-blue-light flex items-center justify-center text-white font-semibold">
                                                {{ substr($perms->first()->submenu->name ?? '-', 0, 1) }}
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ $perms->first()->submenu->name ?? '-' }}</div>
                                        </div>
                                    </div>
                                </td>

                                @php
                                    $map = $perms->keyBy(function($p) {
                                        if (str_contains($p->name, 'View')) return 'view';
                                        if (str_contains($p->name, 'Add')) return 'add';
                                        if (str_contains($p->name, 'Edit')) return 'edit';
                                        if (str_contains($p->name, 'Delete')) return 'delete';
                                    });
                                @endphp

                                @foreach(['view','add','edit','delete'] as $action)
                                    @php
                                        $permission = $map[$action] ?? null;
                                        $permissionId = $permission->id ?? 0;
                                        $roleId = $permission->submenu->type ?? 0;
                                        $key = $permissionId.'-'.$roleId;
                                    @endphp
                                    <td class="px-6 py-4 text-center">
                                        <input type="checkbox"
                                            value="{{ $permissionId }}"
                                            data-role="{{ $roleId }}"
                                            class="perm-checkbox w-5 h-5 accent-orange-primary rounded"
                                            {{ in_array($key, $permissionRoles) ? 'checked' : '' }}>
                                    </td>
                                @endforeach

                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</main>

@vite(['resources/css/user.css','resources/js/admin/permission.js'])
@endsection
