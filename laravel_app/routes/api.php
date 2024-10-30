<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::prefix('/v1')->group(function () {
    Route::get('/hello-world', function () {
        return response(['message' => 'Hello World']);
    });

    Route::get('/users', function () {
        $allItemsCount = User::count();
        $itemsToTake = 30;
        $startId = rand(1, $allItemsCount - $itemsToTake);
        return User::query()->where('id', '>=', $startId)->limit($itemsToTake)->get();
    });
});
