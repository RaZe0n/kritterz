<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $unsubscribeToken;

    public function __construct($email, $unsubscribeToken)
    {
        $this->email = $email;
        $this->unsubscribeToken = $unsubscribeToken;
    }

    public function build()
    {
        return $this->subject('Welkom bij de KritterZ nieuwsbrief!')
                    ->markdown('emails.newsletter-confirmation')
                    ->with([
                        'email' => $this->email,
                        'unsubscribeToken' => $this->unsubscribeToken,
                        'unsubscribeUrl' => url('/newsletter/unsubscribe/' . $this->unsubscribeToken),
                    ]);
    }
} 