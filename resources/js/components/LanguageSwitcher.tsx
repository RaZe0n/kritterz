import { usePage, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface PageProps {
    locale?: string;
    availableLocales?: string[];
}

const LOCALE_META: Record<string, { label: string; flag: string }> = {
    nl: { label: 'Nederlands', flag: '🇳🇱' },
    en: { label: 'English', flag: '🇬🇧' },
    de: { label: 'Deutsch', flag: '🇩🇪' },
    fr: { label: 'Français', flag: '🇫🇷' },
    es: { label: 'Español', flag: '🇪🇸' },
};

const STORAGE_KEY = 'kritterz_preferred_locale';

export default function LanguageSwitcher() {
    const { url, props } = usePage<PageProps>();
    const locales = props.availableLocales && props.availableLocales.length
        ? props.availableLocales
        : ['nl', 'en', 'de', 'fr', 'es'];

    // Derive current locale from URL path (e.g., /es/gallery -> 'es')
    const currentPath = url || '/';
    const segments = currentPath.split('/').filter(Boolean);
    const derivedLocale = locales.includes(segments[0]) ? segments[0] : locales[0] || 'nl';
    const [open, setOpen] = useState(false);

    // Save locale to localStorage when it changes
    useEffect(() => {
        if (derivedLocale && locales.includes(derivedLocale)) {
            localStorage.setItem(STORAGE_KEY, derivedLocale);
        }
    }, [derivedLocale, locales]);

    const pathWithoutLocale = segments.slice(1).join('/');

    const buildPath = (locale: string) => {
        return '/' + locale + (pathWithoutLocale ? '/' + pathWithoutLocale : '');
    };

    const handleLocaleChange = (locale: string) => {
        // Save to localStorage immediately
        localStorage.setItem(STORAGE_KEY, locale);
        setOpen(false);
        // Navigate will happen via Link href
    };

    if (locales.length <= 1) {
        return null;
    }

    const currentMeta = LOCALE_META[derivedLocale] ?? {
        label: derivedLocale.toUpperCase(),
        flag: '',
    };

    return (
        <div className="relative text-xs md:text-sm">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
            >
                <span>{currentMeta.flag}</span>
                <span className="hidden md:inline">{currentMeta.label}</span>
                <svg
                    className={`h-3 w-3 ml-1 transition-transform ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-50"
                >
                    <div className="py-1">
                        {locales.map((loc) => {
                            const meta = LOCALE_META[loc] ?? {
                                label: loc.toUpperCase(),
                                flag: '',
                            };
                            const active = loc === derivedLocale;

                            return (
                                <Link
                                    key={loc}
                                    href={buildPath(loc)}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm ${
                                        active
                                            ? 'bg-orange-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleLocaleChange(loc)}
                                >
                                    <span>{meta.flag}</span>
                                    <span>{meta.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

