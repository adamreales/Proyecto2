<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PedidoConfirmadoMail extends Mailable
{
    use Queueable, SerializesModels;
    public $pedido;
    private $pdfContent;
    private $pdfFilename;

    public function __construct($pedido, ?string $pdfContent = null, ?string $pdfFilename = null)
    {
        $this->pedido = $pedido;
        $this->pdfContent = $pdfContent;
        $this->pdfFilename = $pdfFilename;
    }

    public function build()
    {
        $mail = $this->subject('Pedido confirmado')
            ->view('email.pedido_confirmado');

        if ($this->pdfContent && $this->pdfFilename) {
            $mail->attachData($this->pdfContent, $this->pdfFilename, [
                'mime' => 'application/pdf',
            ]);
        }

        return $mail;
    }
}
