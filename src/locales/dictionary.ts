import 'server-only'
import type { Locale } from '@/locales/i18n-config';
import { Dictionary } from './types';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: Record<string, () => Promise<Dictionary>> = {
  fr: () => import('./fr.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default), 
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]()