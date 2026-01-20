<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ControllerRegistro extends Controller
{
    public function registro(){
        return view('registro');
    }
}
