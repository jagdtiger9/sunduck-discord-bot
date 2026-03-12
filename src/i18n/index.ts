import { Locale } from 'discord-api-types/v10';
import { Translation } from './types.js';
import en from './locales/en.js';
import ru from './locales/ru.js';
import de from './locales/de.js';
import fr from './locales/fr.js';
import es from './locales/es.js';

const locales: Record<string, Translation> = { en, ru, de, fr, es };

function normalizeLocale(locale: string): string {
    if (locale.startsWith('en')) return 'en';
    if (locale.startsWith('es')) return 'es';
    return locale in locales ? locale : 'en';
}

/** Returns the full translation object for the given locale, falling back to English. */
export function t(locale: string): Translation {
    return locales[normalizeLocale(locale)] ?? locales['en'];
}

/** Replaces {variable} placeholders in a template string. */
export function interp(template: string, vars: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

/** Returns a LocalizationMap for all supported locales, for use in slash command builders. */
export function getLocalizations(selector: (tr: Translation) => string): Partial<Record<Locale, string>> {
    return {
        [Locale.EnglishUS]: selector(locales['en']),
        [Locale.EnglishGB]: selector(locales['en']),
        [Locale.Russian]:   selector(locales['ru']),
        [Locale.German]:    selector(locales['de']),
        [Locale.French]:            selector(locales['fr']),
        [Locale.SpanishES]:         selector(locales['es']),
        [Locale.SpanishLATAM]:      selector(locales['es']),
    };
}
