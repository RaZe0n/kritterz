@props(['url'])
<tr>
<td class="header">
    <a href="{{ $url }}" style="color: #1f2937; font-size: 28px; font-weight: 300; text-decoration: none; letter-spacing: -0.025em;">
        {{ $slot }}
    </a>
</td>
</tr>
