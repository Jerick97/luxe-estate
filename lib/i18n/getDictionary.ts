import 'server-only';
import { Locale } from './config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  // Fallback to 'es' if a translation is missing or language not supported here
  const loadDict = dictionaries[locale] ?? dictionaries['es'];
  return loadDict();
};
