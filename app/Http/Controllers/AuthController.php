<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use GuzzleHttp\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AuthRequest $request)
    {

        $data = $request->validated();

        $url = route('passport.token');

        $data = [
            "client_secret" => env('PASSPORT_CLIENT_SECRET', ""),
            "client_id" => env('PASSPORT_CLIENT_ID', 1),
            "grant_type" => 'password', //"password",
            "username" => $data['username'],
            "password" => $data['password'],
        ];

        $request = Request::create($url, 'POST', $data);
        $response = App::handle($request);
        $token = Utils::jsonDecode($response->getContent(), true);

        if (data_get($token, 'error')) {
            return response()->json([
                'error' => data_get($token, 'error'),
                'message' => data_get($token, 'message'),
            ], 401);
        }

        $user = User::query()
            ->where('email', $request->username)
            ->get()
            ->toArray();

        return response()->json([
            ...$token,
            'user' => $user,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
