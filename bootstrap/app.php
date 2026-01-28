<?php

use App\Http\Middleware\CheckExpired;
use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckPendaftaran;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'check.expired' => CheckExpired::class,
            'check.permission' => CheckPermission::class,
            'check.pendaftaran' => CheckPendaftaran::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
