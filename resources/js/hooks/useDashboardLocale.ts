import { usePage } from '@inertiajs/react';

/**
 * Returns the current locale for dashboard routes (from URL / Inertia props).
 * Dashboard is always under /{locale}/dashboard so this is safe.
 */
export function useDashboardLocale(): string {
    const props = usePage().props as { locale?: string; url?: string };
    if (props.locale) return props.locale;
    if (typeof window !== 'undefined' && props.url) {
        const seg = props.url.split('/').filter(Boolean)[0];
        if (['nl', 'en', 'de', 'fr', 'es'].includes(seg)) return seg;
    }
    return 'nl';
}
