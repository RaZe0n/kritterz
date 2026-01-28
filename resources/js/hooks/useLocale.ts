import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const STORAGE_KEY = 'kritterz_preferred_locale';
const DEFAULT_LOCALE = 'nl';

interface PageProps {
    locale?: string;
    availableLocales?: string[];
    url?: string;
}

/**
 * Hook to get the current locale from URL or localStorage
 * Falls back to default locale (nl) if not found
 */
export function useLocale(): string {
    const { url, props } = usePage<PageProps>();
    const locales = props.availableLocales || ['nl', 'en', 'de', 'fr', 'es'];

    return useMemo(() => {
        // First, try to get from URL
        if (url) {
            const segments = url.split('/').filter(Boolean);
            const urlLocale = segments[0];
            if (locales.includes(urlLocale)) {
                return urlLocale;
            }
        }

        // Second, try to get from props.locale
        if (props.locale && locales.includes(props.locale)) {
            return props.locale;
        }

        // Third, try localStorage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && locales.includes(stored)) {
                return stored;
            }
        }

        // Finally, fall back to default
        return DEFAULT_LOCALE;
    }, [url, props.locale, props.availableLocales, locales]);
}

/**
 * Get preferred locale from localStorage or return default
 */
export function getPreferredLocale(availableLocales: string[] = ['nl', 'en', 'de', 'fr', 'es']): string {
    if (typeof window === 'undefined') {
        return DEFAULT_LOCALE;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && availableLocales.includes(stored)) {
        return stored;
    }

    return DEFAULT_LOCALE;
}
