// Keeps the contact address out of the served HTML and JS. The address is
// XOR-encoded with a short key at build time and written to data attributes;
// the browser only decodes it in response to a trusted user event. A scraper
// grepping the page for something@domain finds nothing.

const toHex = (bytes: Uint8Array) =>
	Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

const fromHex = (hex: string) =>
	new Uint8Array(hex.match(/../g)?.map((pair) => parseInt(pair, 16)) ?? []);

function xor(bytes: Uint8Array, key: string) {
	const k = new TextEncoder().encode(key);
	return bytes.map((b, i) => b ^ k[i % k.length] ^ ((i * 31) & 0xff));
}

export function encode(value: string, key: string) {
	return toHex(xor(new TextEncoder().encode(value), key));
}

export function decode(hex: string, key: string) {
	return new TextDecoder().decode(xor(fromHex(hex), key));
}
