<?php

namespace App\Http\Controllers\User\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Movie;


class MovieController extends Controller
{
    public function show(Movie $movie)
    {
        return inertia('User/Dashboard/Movie/Show', ['movie' => $movie]);
    }
}
