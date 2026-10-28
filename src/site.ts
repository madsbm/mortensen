export const site = {
	name: 'Mads Bech Mortensen',
	shortName: 'Mads',
	role: 'Software engineer',
	location: 'Denmark',
	description:
		'Mads Bech Mortensen is a software engineer in Denmark working on systems programming, concurrency, networking and production infrastructure.',
	// Never rendered as plain text. It is XOR-encoded at build time and only
	// decoded in the browser after a real click (see src/lib/obfuscate.ts).
	email: 'mail@madsbechmortensen.dk',
	// Add profile URLs here and they show up in the footer.
	links: [] as { label: string; href: string }[],
	// Chrome origin trial token for the html-in-canvas API. With a token for
	// this domain, visitors get the Canvas UI effects without enabling a flag.
	// Register at https://developer.chrome.com/origintrials
	originTrialToken: '',
};
