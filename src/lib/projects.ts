import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/config';

export type Project = CollectionEntry<'projects'>['data'] &
	CollectionEntry<'writeups'>['data'] & {
		id: string;
		writeup: CollectionEntry<'writeups'>;
	};

/** Projects in list order, each with its write-up in `lang` (falling back
 *  to the default language while a translation is missing). */
export async function getProjects(lang: Lang): Promise<Project[]> {
	const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
	const writeups = await getCollection('writeups');
	const find = (l: Lang, id: string) => writeups.find((w) => w.id === `${l}/${id}`);

	return projects.map(({ id, data }) => {
		const writeup = find(lang, id) ?? find(defaultLang, id);
		if (!writeup) throw new Error(`No write-up for project "${id}"`);
		return { id, ...data, ...writeup.data, writeup };
	});
}

/** getStaticPaths for the case study route of one language. */
export async function projectPaths(lang: Lang) {
	const projects = await getProjects(lang);
	const at = (i: number) => projects[(i + projects.length) % projects.length];
	return projects.map((project, i) => ({
		params: { slug: project.id },
		props: { lang, project, previous: at(i - 1), next: at(i + 1) },
	}));
}

export const pad = (n: number) => String(n).padStart(2, '0');

/** "owner/repo" from a repository URL. */
export const repoName = (href: string) => new URL(href).pathname.replace(/^\/|\/$/g, '');
