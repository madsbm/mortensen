import type { Lang } from './config';

const en = {
	meta: {
		role: 'Software engineer',
		description:
			'Mads Bech Mortensen is a software engineer in Denmark working on systems programming, concurrency, networking and production infrastructure.',
	},
	nav: {
		home: (name: string) => `${name}, home`,
		breadcrumb: 'Breadcrumb',
		primary: 'Primary',
		work: 'Work',
		about: 'About',
		contact: 'Contact',
		skip: 'Skip to content',
	},
	hero: {
		eyebrow: 'Software engineer · Denmark',
		line1: 'Low-level by choice.',
		line2: 'Full-stack by trade.',
		lede: "I'm Mads, a software engineer focused on systems programming, concurrency and networking. By day I build and harden production platforms at Side-Walk. After hours I'm writing tOS, a bare-metal x86_64 operating system in Rust.",
		work: 'See the work',
		contact: 'Get in touch',
	},
	work: {
		title: 'Selected work',
		count: (n: string) => `${n} projects`,
		topics: 'Topics',
		open: 'Read the case study',
	},
	about: {
		title: 'About',
		position: 'Software Engineer at Side-Walk ApS',
		lead: 'I like problems where correctness and performance both matter, and I like owning them end to end.',
		paragraphs: [
			'At Side-Walk I work across the whole lifecycle: architecture, implementation, deployment, maintenance and optimisation. That includes independent audits and takeovers of unfamiliar codebases for larger companies, and performance work on web applications, databases and game servers.',
			'I also designed and rolled out zero-trust access for our internal systems, built on identity-based access control, automated provisioning, mTLS and short-lived SSH certificates.',
		],
		tenure: 'Part-time through high school · full-time since 2026',
		highlights: [
			{ title: 'Live systems under load', text: 'Reworking production systems so they hold up at high concurrency.' },
			{ title: 'Platforms a business runs on', text: 'Building and maintaining revenue-critical software, end to end.' },
			{ title: 'Zero Trust security', text: 'Designing and rolling out identity-based access for internal systems.' },
		],
		toolkit: [
			{ group: 'Systems', items: ['Rust', 'x86_64', 'Linux', 'Memory management', 'Concurrency', 'Network protocols'] },
			{
				group: 'Infrastructure & security',
				items: ['Cloudflare Zero Trust', 'Entra ID · OIDC · SCIM', 'mTLS', 'Smallstep SSH', 'Docker', 'Kubernetes', 'CI/CD'],
			},
			{ group: 'Applications', items: ['TypeScript', 'Java · Netty', 'Laravel', 'Databases', 'Performance tuning'] },
		],
	},
	contact: {
		title: 'Contact',
		location: 'Denmark',
		lead: 'Have a role, a project or a hard problem? Send me a note.',
		note: 'The form opens a prefilled email in your own mail app. Nothing is sent from this site.',
		reveal: 'Show email address',
		noscript: 'Enable JavaScript to see the address.',
		profiles: 'Profiles',
		name: 'Name',
		subject: 'Subject',
		optional: 'Optional',
		message: 'Message',
		submit: 'Open in mail app',
		// Used by the browser script, so these stay plain strings.
		client: {
			defaultSubject: 'Hello from {name}',
			opening: 'Opening your mail app…',
			fallbackBefore: 'Nothing opened? ',
			fallbackButton: 'copy the address',
			fallbackAfter: ' instead.',
			copy: 'Copy',
			copied: 'Copied',
			copyFailed: 'Copy failed',
			copiedToClipboard: 'Copied to your clipboard.',
		},
	},
	project: {
		status: 'Status',
		role: 'Role',
		stack: 'Stack',
		links: 'Links',
		more: 'More projects',
		previous: 'Previous',
		next: 'Next',
		source: 'Source on GitHub',
	},
	status: {
		active: 'In development',
		complete: 'Complete',
		discontinued: 'Discontinued',
	},
	covers: {
		packetplots: { client: (id: string) => `client ${id}`, caption: 'same chunk · different packets' },
		relay: { sources: ['email', 'jira', '+ more'], memory: 'memory', week: (n: number) => `wk ${n}` },
		lectimate: {
			count: '1,000+',
			users: 'students used it',
			day: 'Tuesday',
			lessons: [
				{ time: '08:15', name: 'Mathematics', room: 'Room 204' },
				{ time: '10:00', name: 'Physics', room: 'Lab 2' },
				{ time: '12:30', name: 'Danish', room: 'Room 117' },
			],
			homework: 'Homework',
			homeworkValue: '2 due',
			books: 'Books',
			booksValue: '1 out',
		},
	},
	footer: {
		top: 'Back to top',
	},
	notFound: {
		title: 'Not found',
		code: 'error 404 · page not found',
		heading: 'Nothing is mapped at this address.',
		note: 'The page may have moved, or the link was mistyped.',
		back: 'Back to the start',
	},
};

export type Dictionary = typeof en;

export const ui: Record<Lang, Dictionary> = { en };

export const useTranslations = (lang: Lang) => ui[lang];
