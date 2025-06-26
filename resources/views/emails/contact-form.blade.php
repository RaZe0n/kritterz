@component('mail::message')
# Nieuw bericht via contactformulier

**Van:** {{ $name }}  
**Email:** {{ $email }}  
**Onderwerp:** {{ $subject }}

## Bericht:
{{ $message }}

---
*Dit bericht is automatisch verzonden via het contactformulier op de Kritter website.*
@endcomponent 