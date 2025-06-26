<tr>
<td class="footer">
    <div style="text-align: center; padding: 20px 0;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
            © {{ date('Y') }} {{ config('app.name') }}. Alle rechten voorbehouden.
        </p>
        <p style="color: #9ca3af; font-size: 11px; margin: 8px 0 0 0; font-style: italic;">
            {{ $slot }}
        </p>
    </div>
</td>
</tr>
