<?php

namespace App\Providers;

use App\Models\Menu;
use App\Models\Submenu;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
        public function boot(): void
        {
            View::composer('*', function ($view) {
                $role = session('role');
                // dd($role);

                // Ambil menu utama berdasarkan type
                $menus = Menu::with(['submenus' => function ($query) {
                    $query->where('type_menu', '!=', 0); // Ambil submenus yang bukan menu tunggal
                }])->where('type', $role)->get();

                // Ambil submenus dengan type_menu = 0 sebagai menu tunggal
                $singleMenus = Submenu::where('type_menu', 0)
                    ->where('type', $role)
                    ->get();
                // dd($singleMenus, $menus);
                // Share data ke view
                $view->with([
                    'menus' => $menus,
                    'singleMenus' => $singleMenus,
                ]);
            });
        }
}
