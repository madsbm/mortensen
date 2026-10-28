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
		language: 'Language',
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

const da: Dictionary = {
	meta: {
		role: 'Softwareudvikler',
		description:
			'Mads Bech Mortensen er softwareudvikler i Danmark og arbejder med systemprogrammering, concurrency, netværk og produktionsinfrastruktur.',
	},
	nav: {
		home: (name: string) => `${name}, forside`,
		breadcrumb: 'Brødkrumme',
		primary: 'Primær',
		work: 'Arbejde',
		about: 'Om',
		contact: 'Kontakt',
		skip: 'Spring til indhold',
		language: 'Sprog',
	},
	hero: {
		eyebrow: 'Softwareudvikler · Danmark',
		line1: 'Low-level af lyst.',
		line2: 'Full-stack af fag.',
		lede: 'Jeg hedder Mads og er softwareudvikler med fokus på systemprogrammering, concurrency og netværk. Til daglig bygger og hærder jeg produktionsplatforme hos Side-Walk. I fritiden skriver jeg tOS, et bare-metal x86_64-styresystem i Rust.',
		work: 'Se mit arbejde',
		contact: 'Kontakt mig',
	},
	work: {
		title: 'Udvalgt arbejde',
		count: (n: string) => `${n} projekter`,
		topics: 'Emner',
		open: 'Læs om projektet',
	},
	about: {
		title: 'Om mig',
		position: 'Softwareudvikler hos Side-Walk ApS',
		lead: 'Jeg kan lide problemer, hvor både korrekthed og ydeevne betyder noget, og jeg kan lide at eje dem fra start til slut.',
		paragraphs: [
			'Hos Side-Walk arbejder jeg på tværs af hele livscyklussen: arkitektur, implementering, deployment, vedligeholdelse og optimering. Det omfatter selvstændige gennemgange og overtagelser af ukendte kodebaser for større virksomheder samt performancearbejde på webapplikationer, databaser og spilservere.',
			'Jeg har også designet og udrullet zero trust-adgang til vores interne systemer, bygget på identitetsbaseret adgangskontrol, automatisk provisionering, mTLS og kortlivede SSH-certifikater.',
		],
		tenure: 'Deltid gennem gymnasiet · fuldtid siden 2026',
		highlights: [
			{ title: 'Livesystemer under pres', text: 'Ombygning af produktionssystemer, så de holder til mange samtidige brugere.' },
			{ title: 'Platforme, en forretning kører på', text: 'Udvikling og drift af forretningskritisk software fra start til slut.' },
			{ title: 'Zero trust-sikkerhed', text: 'Design og udrulning af identitetsbaseret adgang til interne systemer.' },
		],
		toolkit: [
			{
				group: 'Systemer',
				items: ['Rust', 'x86_64', 'Linux', 'Hukommelseshåndtering', 'Concurrency', 'Netværksprotokoller'],
			},
			{
				group: 'Infrastruktur & sikkerhed',
				items: ['Cloudflare Zero Trust', 'Entra ID · OIDC · SCIM', 'mTLS', 'Smallstep SSH', 'Docker', 'Kubernetes', 'CI/CD'],
			},
			{ group: 'Applikationer', items: ['TypeScript', 'Java · Netty', 'Laravel', 'Databaser', 'Performanceoptimering'] },
		],
	},
	contact: {
		title: 'Kontakt',
		location: 'Danmark',
		lead: 'Har du en stilling, et projekt eller et svært problem? Skriv til mig.',
		note: 'Formularen åbner en udfyldt mail i dit eget mailprogram. Intet bliver sendt fra denne side.',
		reveal: 'Vis mailadresse',
		noscript: 'Slå JavaScript til for at se adressen.',
		profiles: 'Profiler',
		name: 'Navn',
		subject: 'Emne',
		optional: 'Valgfrit',
		message: 'Besked',
		submit: 'Åbn i mailprogram',
		client: {
			defaultSubject: 'Hej fra {name}',
			opening: 'Åbner dit mailprogram…',
			fallbackBefore: 'Skete der ikke noget? ',
			fallbackButton: 'Kopiér adressen',
			fallbackAfter: ' i stedet.',
			copy: 'Kopiér',
			copied: 'Kopieret',
			copyFailed: 'Kunne ikke kopiere',
			copiedToClipboard: 'Kopieret til udklipsholderen.',
		},
	},
	project: {
		status: 'Status',
		role: 'Rolle',
		stack: 'Teknologier',
		links: 'Links',
		more: 'Flere projekter',
		previous: 'Forrige',
		next: 'Næste',
		source: 'Kildekode på GitHub',
	},
	status: {
		active: 'Under udvikling',
		complete: 'Færdig',
		discontinued: 'Udgået',
	},
	covers: {
		packetplots: { client: (id: string) => `klient ${id}`, caption: 'samme chunk · forskellige pakker' },
		relay: { sources: ['e-mail', 'jira', '+ flere'], memory: 'hukommelse', week: (n: number) => `uge ${n}` },
		lectimate: {
			count: '1.000+',
			users: 'elever brugte den',
			day: 'Tirsdag',
			lessons: [
				{ time: '08:15', name: 'Matematik', room: 'Lokale 204' },
				{ time: '10:00', name: 'Fysik', room: 'Lab 2' },
				{ time: '12:30', name: 'Dansk', room: 'Lokale 117' },
			],
			homework: 'Lektier',
			homeworkValue: '2 åbne',
			books: 'Bøger',
			booksValue: '1 lånt',
		},
	},
	footer: {
		top: 'Til toppen',
	},
	notFound: {
		title: 'Ikke fundet',
		code: 'fejl 404 · siden findes ikke',
		heading: 'Intet er mappet til denne adresse.',
		note: 'Siden er måske flyttet, eller linket er skrevet forkert.',
		back: 'Tilbage til forsiden',
	},
};

export const ui: Record<Lang, Dictionary> = { en, da };

export const useTranslations = (lang: Lang) => ui[lang];
