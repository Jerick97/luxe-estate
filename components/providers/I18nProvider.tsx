"use client";

import React, { createContext, useContext } from 'react';
import { Locale } from '@/lib/i18n/config';

// Define a recursive dictionary type
type Dictionary = Record<string, any>;

interface I18nContextProps {
  locale: Locale;
  dictionary: Dictionary;
}

const I18nContext = createContext<I18nContextProps | null>(null);

export function I18nProvider({ 
  children, 
  locale, 
  dictionary 
}: { 
  children: React.ReactNode; 
  locale: Locale; 
  dictionary: Dictionary;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }

  // Helper function to resolve dot notation (e.g., 'navbar.buy')
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = context.dictionary;
    
    for (const k of keys) {
      if (value === undefined || value === null) break;
      value = value[k];
    }
    
    return value !== undefined ? (value as string) : key;
  };

  return { t, locale: context.locale };
}
