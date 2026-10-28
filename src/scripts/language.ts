import { languageKey } from '../i18n/config';

/** Remembers an explicit language choice (it then wins over the browser's
 *  preference, see Base.astro) and, on the home page, carries the section in
 *  view over to the other language. */
export function setUpLanguageSwitch() {
	for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]')) {
		link.addEventListener('click', () => {
			try {
				localStorage.setItem(languageKey, link.dataset.langSwitch ?? '');
			} catch {
				// Storage can be unavailable (private mode); the link still works.
			}

			const map = link.dataset.sectionMap && JSON.parse(link.dataset.sectionMap);
			const current = document.querySelector('[data-spy][data-shown] .crumb-text:not(.is-leaving)')?.textContent;
			if (map && current && map[current]) link.hash = map[current];
		});
	}
}
