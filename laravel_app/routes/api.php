<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
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

    Route::get('/jwt', function () {
        $key = 'some_private_jwt_key_string';
        $userId = 321321;
        $tokenId = 87484;
        $currentTime = time();
        $payload = [
            'iss' => 'http://example.org',
            'aud' => 'http://example.com',
            'iat' => $currentTime,
            'exp' => $currentTime + 3600,
            'sub' => $userId,

        ];
        $algorithm = 'HS256';

        $jwt = JWT::encode($payload, $key, $algorithm);

        $decoded = (array)JWT::decode($jwt, new Key($key, $algorithm));

        return response($decoded);
    });
});
