<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Cria um novo usuario
    public function register(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|lowercase|email|max:255|unique:" . User::class,
            "password" => ["required", "confirmed", Rules\Password::defaults()],
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        return response()->json([
            "name" => $user->name,
            "email" => $user->email,
            "password" => $user->password,
        ]);
    }

    // Efetua o login, retornando um token de acesso
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|string|email",
            "password" => "required"
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken("access_token")->plainTextToken;

        return response()->json([
            "access_token" => $token,
        ]);
    }

    // Efetua o logout, revogando todos os tokens de acesso do usuario
    public function logout()
    {
        $user = User::find(Auth::id());

        $user->tokens()->delete();

        return response()->json()->setStatusCode(204);
    }
}
