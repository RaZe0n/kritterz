@component('mail::message')
# Welkom bij de KritterZ nieuwsbrief!

Beste nieuwsbrief abonnee,

Bedankt voor je inschrijving voor de KritterZ nieuwsbrief! Je bent nu ingeschreven en ontvangt 2 a 3 keer per jaar updates over nieuwe KritterZ en exposities.

## Wat kun je verwachten?
- Updates over nieuwe kunstwerken
- Aankondigingen van exposities
- Achtergrondverhalen over de creaties
- Exclusieve previews

Ik respecteer je privacy en stuur alleen relevante updates. Je kunt je op elk moment uitschrijven via de link onderaan deze e-mail.

@component('mail::button', ['url' => config('app.url')])
Bezoek de website
@endcomponent

Met vriendelijke groet,<br>
Corine - KritterZ

---

**Je e-mailadres:** {{ $email }}

@component('mail::button', ['url' => $unsubscribeUrl, 'color' => 'red'])
Uitschrijven van de nieuwsbrief
@endcomponent

*Als de knop niet werkt, kun je ook deze link gebruiken: {{ $unsubscribeUrl }}*

---
*Dit bericht is automatisch verzonden omdat je je hebt ingeschreven voor de KritterZ nieuwsbrief.*
@endcomponent 