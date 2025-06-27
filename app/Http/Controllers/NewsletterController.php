<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use App\Mail\NewsletterConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Subscribe to newsletter
     */
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscribers,email'
        ], [
            'email.required' => 'E-mailadres is verplicht.',
            'email.email' => 'Voer een geldig e-mailadres in.',
            'email.unique' => 'Dit e-mailadres is al ingeschreven voor de nieuwsbrief.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first('email'),
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $subscriber = NewsletterSubscriber::create([
                'email' => $request->email,
                'is_active' => true,
                'subscribed_at' => now()
            ]);

            // Send confirmation email
            Mail::to($request->email)->send(new NewsletterConfirmationMail($request->email, $subscriber->unsubscribe_token));

            return response()->json([
                'success' => true,
                'message' => 'Bedankt! Je bent succesvol ingeschreven voor de nieuwsbrief. Check je e-mail voor een bevestiging.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Er is een fout opgetreden. Probeer het later opnieuw.'
            ], 500);
        }
    }

    /**
     * Unsubscribe from newsletter via token (email link)
     */
    public function unsubscribeByToken($token)
    {
        $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

        if (!$subscriber) {
            return Inertia::render('newsletter/unsubscribe-error', [
                'message' => 'Ongeldige uitschrijflink. Mogelijk ben je al uitgeschreven of is de link verlopen.'
            ]);
        }

        try {
            $email = $subscriber->email;
            $subscriber->delete();

            return Inertia::render('newsletter/unsubscribe-success', [
                'email' => $email,
                'message' => 'Je bent succesvol uitgeschreven van de nieuwsbrief.'
            ]);

        } catch (\Exception $e) {
            return Inertia::render('newsletter/unsubscribe-error', [
                'message' => 'Er is een fout opgetreden bij het uitschrijven. Probeer het later opnieuw.'
            ]);
        }
    }

    /**
     * Unsubscribe from newsletter (API endpoint)
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:newsletter_subscribers,email'
        ], [
            'email.required' => 'E-mailadres is verplicht.',
            'email.email' => 'Voer een geldig e-mailadres in.',
            'email.exists' => 'Dit e-mailadres is niet ingeschreven voor de nieuwsbrief.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first('email'),
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $subscriber = NewsletterSubscriber::where('email', $request->email)->first();
            $subscriber->delete();

            return response()->json([
                'success' => true,
                'message' => 'Je bent succesvol uitgeschreven van de nieuwsbrief.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Er is een fout opgetreden. Probeer het later opnieuw.'
            ], 500);
        }
    }

    /**
     * Check if email is already subscribed
     */
    public function checkSubscription(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ], [
            'email.required' => 'E-mailadres is verplicht.',
            'email.email' => 'Voer een geldig e-mailadres in.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first('email'),
                'errors' => $validator->errors()
            ], 422);
        }

        $subscriber = NewsletterSubscriber::where('email', $request->email)->first();

        return response()->json([
            'success' => true,
            'is_subscribed' => $subscriber ? $subscriber->is_active : false,
            'message' => $subscriber && $subscriber->is_active 
                ? 'Dit e-mailadres is al ingeschreven voor de nieuwsbrief.'
                : 'E-mailadres is beschikbaar voor inschrijving.'
        ], 200);
    }

    /**
     * Show newsletter subscribers in dashboard
     */
    public function index()
    {
        $subscribers = NewsletterSubscriber::orderBy('created_at', 'desc')->get();
        
        $stats = [
            'total' => $subscribers->count(),
            'active' => $subscribers->where('is_active', true)->count(),
            'inactive' => $subscribers->where('is_active', false)->count(),
        ];
        
        return Inertia::render('dashboard/newsletter', [
            'subscribers' => $subscribers,
            'stats' => $stats
        ]);
    }

    /**
     * Delete a subscriber
     */
    public function destroy(NewsletterSubscriber $subscriber): JsonResponse
    {
        try {
            $subscriber->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Abonnee succesvol verwijderd.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Er is een fout opgetreden bij het verwijderen van de abonnee.'
            ], 500);
        }
    }

    /**
     * Toggle subscriber status
     */
    public function toggleStatus(NewsletterSubscriber $subscriber): JsonResponse
    {
        try {
            $subscriber->update(['is_active' => !$subscriber->is_active]);
            
            return response()->json([
                'success' => true,
                'message' => $subscriber->is_active 
                    ? 'Abonnee succesvol geactiveerd.'
                    : 'Abonnee succesvol gedeactiveerd.',
                'is_active' => $subscriber->is_active
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Er is een fout opgetreden bij het wijzigen van de status.'
            ], 500);
        }
    }
}
