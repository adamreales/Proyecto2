<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificacionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nombre;
    public $id_usuario;

    public function __construct($nombre,$id_usuario)
    {
        $this->nombre = $nombre;
        $this->id_usuario = $id_usuario;
    }

    public function build()
    {
        return $this->subject('Bienvenido a Zent')
                    ->view('verificacion_mail'); 
    }
}
