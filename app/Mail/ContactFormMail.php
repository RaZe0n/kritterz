<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contactData;

    public function __construct($contactData)
    {
        $this->contactData = $contactData;
    }

    public function build()
    {
        return $this->subject('Nieuw contactformulier bericht - ' . $this->contactData['subject'])
                    ->markdown('emails.contact-form')
                    ->with([
                        'name' => $this->contactData['name'],
                        'email' => $this->contactData['email'],
                        'subject' => $this->contactData['subject'],
                        'message' => $this->contactData['message'],
                    ]);
    }
} 