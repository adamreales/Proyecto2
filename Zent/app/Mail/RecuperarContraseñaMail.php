<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecuperarContraseñaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $token;
    public $resetLink;

    public function __construct($email, $token)
    {
        $this->email = $email;
        $this->token = $token;
        // Construir el link para resetear la contraseña
        $this->resetLink = env('FRONT_URL') . '/reset-password?token=' . $token . '&email=' . urlencode($email);
    }

    public function build()
    {
        return $this->subject('Recupera tu contraseña - ZENT')
                    ->view('email.recuperar_contraseña')
                    ->with([
                        'resetLink' => $this->resetLink,
                        'email' => $this->email
                    ]);
    }
}
