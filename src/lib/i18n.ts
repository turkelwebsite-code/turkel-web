export const LOCALES = ["tr", "en"] as const;
export const DEFAULT_LOCALE = "tr";

export type Locale = typeof LOCALES[number];

export function withLocale(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${clean}`;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split("/");
  if (LOCALES.includes(locale as Locale)) {
    return locale as Locale;
  }
  return DEFAULT_LOCALE;
}

export function removeLocaleFromUrl(url: string): string {
  const [, locale, ...rest] = url.split("/");
  if (LOCALES.includes(locale as Locale)) {
    return "/" + rest.join("/");
  }
  return url;
}
