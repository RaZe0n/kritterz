<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        // Validate the form data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            // Send the email
            Mail::to('kritterzart@gmail.com')->send(new ContactFormMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Er is een fout opgetreden. Probeer het later opnieuw.'
            ], 500);
        }
    }
} 