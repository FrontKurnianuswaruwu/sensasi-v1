<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logo sensasi.png') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Flatpickr core -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

    <!-- MonthSelect plugin -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/style.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/index.js"></script>

</head>
<body class="bg-gray-100 font-sans">
    <!-- Header -->
    <header class="bg-white shadow-lg fixed w-full top-0 z-50">
        <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center">
                <button id="sidebarToggle" class="lg:hidden text-gray-600 hover:text-orange-primary mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <div class="flex items-center">
                    <img src="/img/logosensasi.webp" 
                        alt="Logo Sensasi" 
                        class="w-100 h-10 mr-3 object-cover">                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="relative dropdown-container">
                    <button id="adminDropdown" class="flex items-center space-x-2 text-gray-600 hover:text-blue-primary">
                        <div class="w-8 h-8 bg-gradient-to-r from-orange-primary to-blue-primary rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-bold">{{ strtoupper($nameuser[0]) }}</span>
                        </div>
                        <span class="hidden md:block">{{ $nameuser }}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="dropdownMenu" 
                        class="dropdown-menu hidden absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-56 z-50">
                        <div class="py-2">
                            <!-- User Info Section -->
                            <div class="px-4 py-3 border-b border-gray-100">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-orange-primary to-blue-primary rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-bold">{{ strtoupper($nameuser[0]) }}</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">{{ $nameuser }}</p>
                                        <p class="text-xs text-gray-500">sensasi</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Menu Items -->
                            <div class="py-1">
                                <a href="#" class="menu-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    My Profile
                                </a>
                            </div>
                            
                            <!-- Divider -->
                            <div class="border-t border-gray-100"></div>
                            
                            <!-- Logout Section -->
                            <div class="py-1">
                                <form method="POST" action="{{ route('auth.logout') }}">
                                    @csrf
                                    <button type="submit"
                                        class="menu-item w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none">
                                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                        </svg>
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="flex pt-16">
        <!-- Sidebar -->
        <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex flex-col pt-16 -translate-x-full lg:translate-x-0 transition-transform">
            <div class="flex flex-col h-full">
                @php
                    // Tentukan route yang diizinkan berdasarkan status user
                    if (in_array($userstatus, ['Biodata', 'Potensi Akademik', 'Verifikasi'])) {
                        $allowedRoutes = [];

                        if ($userstatus === 'Biodata') {
                            $allowedRoutes = [
                                'admin.biodatamahasiswa.index',
                                'admin.dashboard.index',
                                'admin.potensiakademik.index',
                            ];
                        } elseif ($userstatus === 'Potensi Akademik') {
                            $allowedRoutes = [
                                'admin.potensiakademik.index',
                                'admin.dashboard.index',
                                'admin.biodatamahasiswa.index',
                            ];
                        } elseif ($userstatus === 'Verifikasi') {
                            $allowedRoutes = [
                                'admin.dashboard.index',
                                'admin.biodatamahasiswa.index',
                                'admin.potensiakademik.index',
                            ];
                        }

                        // Filter singleMenus
                        $singleMenus = collect($singleMenus)->filter(function($menu) use ($allowedRoutes) {
                            return in_array($menu->route, $allowedRoutes);
                        })->values();

                        // Filter menus & submenus
                        $menus = collect($menus)->filter(function($menu) use ($allowedRoutes) {
                            $menu->submenus = collect($menu->submenus)->filter(function($submenu) use ($allowedRoutes) {
                                return in_array($submenu->route, $allowedRoutes);
                            })->values();
                            return $menu->submenus->count() > 0;
                        })->values();
                    }
                @endphp

                <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {{-- Loop single menu --}}
                    @foreach($singleMenus as $single)
                        @php
                            $isActive = Route::currentRouteName() === $single->route;
                        @endphp
                        <a href="{{ route($single->route ?? '#') }}"
                        class="menu-item flex items-center px-4 py-3 rounded-lg
                        {{ $isActive ? 'bg-gradient-to-r from-orange-primary to-blue-primary text-white' : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-primary hover:to-blue-primary hover:text-white' }}">
                            @if($single->icon)
                                <i class="{{ $single->icon }} w-5 h-5 mr-3"></i>
                            @else
                                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            @endif
                            {{ $single->name }}
                        </a>
                    @endforeach

                    {{-- Loop master menu + submenus --}}
                    @foreach($menus as $menu)
                        @php
                            $submenuRoutes = $menu->submenus->pluck('route')->toArray();
                            $isMenuActive = in_array(Route::currentRouteName(), $submenuRoutes);
                        @endphp
                        <div class="menu-group">
                            <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 rounded-lg
                            {{ $isMenuActive ? 'bg-gradient-to-r from-orange-primary to-blue-primary text-white' : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-primary hover:to-blue-primary hover:text-white' }}">
                                <div class="flex items-center">
                                    @if($menu->icon)
                                        <i class="{{ $menu->icon }} w-5 h-5 mr-3"></i>
                                    @else
                                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                        </svg>
                                    @endif
                                    {{ $menu->name }}
                                </div>
                                <svg class="w-4 h-4 transition-transform chevron {{ $isMenuActive ? 'rotate-180' : '' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>

                            @php
                                // Cek apakah ada submenu yang aktif
                                $hasActiveSubmenu = collect($menu->submenus)->contains(function($submenu) {
                                    return Route::currentRouteName() === $submenu->route;
                                });
                            @endphp

                            <div class="submenu ml-6 mt-1 {{ $hasActiveSubmenu ? 'active' : 'hidden' }}">
                                @foreach($menu->submenus as $submenu)
                                    @php
                                        $isSubActive = Route::currentRouteName() === $submenu->route;
                                    @endphp
                                    <a href="{{ route($submenu->route ?? '#') }}"
                                    class="flex items-center px-4 py-2 text-sm rounded
                                    {{ $isSubActive ? 'bg-orange-100 text-orange-primary' : 'text-gray-600 hover:bg-orange-100 hover:text-orange-primary' }}">
                                        @if($submenu->icon)
                                            <i class="{{ $submenu->icon }} w-3 h-3 mr-3"></i>
                                        @else
                                            <span class="w-2 h-2 bg-orange-primary rounded-full mr-3"></span>
                                        @endif
                                        {{ $submenu->name }}
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </nav>
                <!-- Sidebar Footer -->
                <div class="px-4 py-4 border-t border-gray-200 bg-white mt-auto">
                    <a href="{{ route('auth.login') }}" 
                        class="w-full flex items-center px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Logout
                    </a>
                </div>
            </div>
        </aside>

        {{-- content --}}
        <main class="flex-1 ml-0 lg:ml-64">
        @yield('content')
        </main>

    </div>

    <!-- Mobile Sidebar Overlay -->
    <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden hidden"></div>

    @vite(['resources/js/admin/dashboard.js', 'resources/css/admin.css'])
</body>
<script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>


</html>