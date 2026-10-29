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
		lede: 'Full-stack engineer at Side-Walk, writing an operating system in Rust on the side.',
		work: 'See the work',
		contact: 'Get in touch',
	},
	skills: {
		// `icon` names an icon in src/components/SkillIcon.astro. Skills without
		// one show as a single square.
		groups: [
			{
				group: 'Web & apps',
				items: [
					{ name: 'Laravel', icon: 'laravel' },
					{ name: 'Vue 3', icon: 'vue' },
					{ name: 'React', icon: 'react' },
					{ name: 'React Native' },
					{ name: 'Redis' },
					{ name: 'MariaDB', icon: 'mariadb' },
					{ name: 'MongoDB', icon: 'mongodb' },
				],
			},
			{
				group: 'Infrastructure',
				items: [
					{ name: 'x86_64', icon: 'x86' },
					{ name: 'Linux', icon: 'linux' },
					{ name: 'Concurrency' },
					{ name: 'Memory management' },
					{ name: 'Network protocols' },
					{ name: 'Reverse engineering' },
					{ name: 'Cloudflare Zero Trust', icon: 'cloudflare' },
					{ name: 'Entra ID · OIDC · SCIM', icon: 'oidc' },
					{ name: 'mTLS', icon: 'mtls' },
					{ name: 'Docker', icon: 'docker' },
					{ name: 'Kubernetes', icon: 'kubernetes' },
					{ name: 'NGINX', icon: 'nginx' },
					{ name: 'Nix', icon: 'nix' },
					{ name: 'CI/CD', icon: 'cicd' },
				],
			},
		],
		// Beside the grid. The first few show; the rest fold out on hover.
		languages: {
			label: 'In languages such as',
			more: (n: number) => `& ${n} more`,
			items: [
				{ name: 'Rust', icon: 'rust' },
				{ name: 'TypeScript', icon: 'typescript' },
				{ name: 'Java', icon: 'java' },
				{ name: 'PHP', icon: 'php' },
				{ name: 'C#', icon: 'csharp' },
				{ name: 'Python', icon: 'python' },
			],
		},
	},
	work: {
		title: 'Selected work',
		count: (n: string) => `${n} projects`,
		topics: 'Topics',
		open: 'Read the case study',
		more: (n: number) => `Show ${n} more projects`,
	},
	about: {
		title: 'About',
		position: 'Software Engineer at Side-Walk ApS',
		lead: 'I like problems where correctness and performance both matter, and I like owning them end to end.',
		timeline: {
			title: 'Timeline',
			// The details show on hover, or under each stop on touch screens.
			events: [
				{
					when: '2018',
					title: 'Started programming',
					details: ['Skript, for Minecraft servers', 'Sold my scripts to server owners for pocket money'],
				},
				{ when: '2023', title: 'Started at HTX', details: ['Technical high school at Tradium', 'Mathematics A and Informatics B'] },
				{
					when: '2023',
					title: 'Launched Lectimate',
					details: [
						'A study app for students whose school uses Lectio',
						'1,000+ users',
						'React Native, Expo, Swift, MongoDB, Next.js',
						'Ran until November 2024',
					],
				},
				{
					when: '2025',
					title: 'Joined Side-Walk',
					details: [
						'Full-stack developer, part-time alongside school',
						'Laravel, Vue 3, Inertia',
						'Web platforms, internal tools and iOS apps',
						'Working directly with customers',
					],
				},
				{
					when: '2026',
					title: 'Graduated from HTX',
					details: [
						'GPA 10.9 out of 12',
						'Final project (SOP) on cryptography in secure network protocols: Ed25519/X25519, RSA, HMAC, SHA, AES-CFB',
						'SOP graded 12, the top grade',
					],
				},
				{
					when: '2026',
					title: 'Full-time at Side-Walk',
					details: [
						'Software engineer',
						'From architecture through to operations',
						'Audits and takeovers of unfamiliar codebases',
						'Rolled out Zero Trust access',
					],
				},
			],
			// The open stop at the end.
			next: { when: 'Next', title: 'Your idea here?', link: 'Get in touch' },
		},
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
		lede: 'Full-stack-udvikler hos Side-Walk, og ved siden af skriver jeg et styresystem i Rust.',
		work: 'Se mit arbejde',
		contact: 'Kontakt mig',
	},
	skills: {
		groups: [
			{
				group: 'Web & apps',
				items: [
					{ name: 'Laravel', icon: 'laravel' },
					{ name: 'Vue 3', icon: 'vue' },
					{ name: 'React', icon: 'react' },
					{ name: 'React Native' },
					{ name: 'Redis' },
					{ name: 'MariaDB', icon: 'mariadb' },
					{ name: 'MongoDB', icon: 'mongodb' },
				],
			},
			{
				group: 'Infrastruktur',
				items: [
					{ name: 'x86_64', icon: 'x86' },
					{ name: 'Linux', icon: 'linux' },
					{ name: 'Concurrency' },
					{ name: 'Hukommelseshåndtering' },
					{ name: 'Netværksprotokoller' },
					{ name: 'Reverse engineering' },
					{ name: 'Cloudflare Zero Trust', icon: 'cloudflare' },
					{ name: 'Entra ID · OIDC · SCIM', icon: 'oidc' },
					{ name: 'mTLS', icon: 'mtls' },
					{ name: 'Docker', icon: 'docker' },
					{ name: 'Kubernetes', icon: 'kubernetes' },
					{ name: 'NGINX', icon: 'nginx' },
					{ name: 'Nix', icon: 'nix' },
					{ name: 'CI/CD', icon: 'cicd' },
				],
			},
		],
		languages: {
			label: 'I sprog som',
			more: (n: number) => `& ${n} flere`,
			items: [
				{ name: 'Rust', icon: 'rust' },
				{ name: 'TypeScript', icon: 'typescript' },
				{ name: 'Java', icon: 'java' },
				{ name: 'PHP', icon: 'php' },
				{ name: 'C#', icon: 'csharp' },
				{ name: 'Python', icon: 'python' },
			],
		},
	},
	work: {
		title: 'Udvalgt arbejde',
		count: (n: string) => `${n} projekter`,
		topics: 'Emner',
		open: 'Læs om projektet',
		more: (n: number) => `Vis ${n} projekter mere`,
	},
	about: {
		title: 'Om mig',
		position: 'Softwareudvikler hos Side-Walk ApS',
		lead: 'Jeg kan lide problemer, hvor både korrekthed og ydeevne betyder noget, og jeg kan lide at eje dem fra start til slut.',
		timeline: {
			title: 'Tidslinje',
			events: [
				{
					when: '2018',
					title: 'Begyndte at programmere',
					details: ['Skript til Minecraft-servere', 'Solgte mine scripts til serverejere for lommepenge'],
				},
				{ when: '2023', title: 'Startede på HTX', details: ['Tradium', 'Matematik A og Informatik B'] },
				{
					when: '2023',
					title: 'Lancerede Lectimate',
					details: [
						'Studie-app til elever, hvis skole bruger Lectio',
						'1.000+ brugere',
						'React Native, Expo, Swift, MongoDB, Next.js',
						'Kørte til november 2024',
					],
				},
				{
					when: '2025',
					title: 'Startede hos Side-Walk',
					details: [
						'Full-stack-udvikler på deltid ved siden af skolen',
						'Laravel, Vue 3, Inertia',
						'Webplatforme, interne værktøjer og iOS-apps',
						'Direkte kundedialog',
					],
				},
				{
					when: '2026',
					title: 'Student fra HTX',
					details: [
						'Karaktergennemsnit 10,9',
						'SOP om kryptografi i sikre netværksprotokoller: Ed25519/X25519, RSA, HMAC, SHA, AES-CFB',
						'SOP: 12',
					],
				},
				{
					when: '2026',
					title: 'Fuldtid hos Side-Walk',
					details: [
						'Softwareudvikler',
						'Fra arkitektur til drift',
						'Gennemgange og overtagelser af ukendte kodebaser',
						'Udrullede zero trust-adgang',
					],
				},
			],
			next: { when: 'Næste', title: 'Din idé her?', link: 'Kontakt mig' },
		},
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
