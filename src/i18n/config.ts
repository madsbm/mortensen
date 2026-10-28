export const locales = ['en', 'da'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

export type SectionKey = 'work' | 'about' | 'contact';

/** Section anchors on the home page. The work slug doubles as the path
 *  segment for case studies, so the breadcrumbs read like the URL; its route
 *  folder (src/pages/work, src/pages/da/arbejde) must match. */
export const sections: Record<Lang, Record<SectionKey, string>> = {
	en: { work: 'work', about: 'about', contact: 'contact' },
	da: { work: 'arbejde', about: 'om', contact: 'kontakt' },
};

export const ogLocale: Record<Lang, string> = {
	en: 'en_GB',
	da: 'da_DK',
};

export const homePath = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`);
export const sectionPath = (lang: Lang, key: SectionKey) => `${homePath(lang)}#${sections[lang][key]}`;
export const projectPath = (lang: Lang, id: string) => `${homePath(lang)}${sections[lang].work}/${id}`;

/** The same page in every language, for hreflang links and the switcher. */
export const alternatesFor = (path: (lang: Lang) => string) =>
	Object.fromEntries(locales.map((lang) => [lang, path(lang)])) as Record<Lang, string>;
