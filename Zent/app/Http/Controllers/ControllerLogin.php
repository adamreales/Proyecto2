<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ControllerLogin extends Controller
{
    public function login(){
        return view('login');
    }
}
