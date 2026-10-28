// Language-independent details. Copy lives in src/i18n/ui.ts.
export const site = {
	name: 'Mads Bech Mortensen',
	shortName: 'Mads',
	// Never rendered as plain text. It is XOR-encoded at build time and only
	// decoded in the browser after a real click (see src/lib/obfuscate.ts).
	email: 'mail@madsbechmortensen.dk',
	// Profiles, shown in the footer and contact section and listed as sameAs.
	links: [
		{ label: 'GitHub', href: 'https://github.com/madsbm' },
		{ label: 'LinkedIn', href: 'https://dk.linkedin.com/in/mads-bech-mortensen-755830319' },
	],
	// Chrome origin trial token for the html-in-canvas API. With a token for
	// this domain, visitors get the Canvas UI effects without enabling a flag.
	// Register at https://developer.chrome.com/origintrials
	originTrialToken: '',
};
