@component('mail::message')
# Nieuw bericht via contactformulier

**Van:** {{ $name }}  
**Email:** {{ $email }}  
**Onderwerp:** {{ $subject }}

## Bericht:
{ 