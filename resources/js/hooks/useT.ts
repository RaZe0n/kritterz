export function useT(translations: Record<string, string>) {
    return (key: string, fallback?: string) => translations[key] ?? fallback ?? key;
}

