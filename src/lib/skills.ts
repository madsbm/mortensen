// Lays out the skill grid: a contribution graph where each skill lights up a
// square, or a bigger tile. Each group gets a block of columns under its
// label, wide enough that its skills fill a little under half of it, and
// they're scattered over it like contributions, at spots that look random
// but stay the same from build to build.

/** Squares per column, like the days of a week. */
export const rows = 7;
// How much of a block the skills cover.
const fill = 0.45;

type Spot = { row: number; column: number };

export interface PlacedGroup<Item> {
	label: string;
	/** Where the block starts when all of them sit in one row, counting an
	 *  empty column between blocks. */
	start: number;
	span: number;
	/** From left to right. Rows and columns are of each skill's top left
	 *  square, from the start of the block. */
	skills: (Item & Spot)[];
}

/** `size` is how many squares a skill's tile spans each way. */
export function layoutSkills<Item extends { size: number }>(
	groups: { group: string; items: Item[] }[],
): PlacedGroup<Item>[] {
	let start = 0;
	return groups.map(({ group, items }, i) => {
		const area = items.reduce((sum, { size }) => sum + size * size, 0);
		const span = Math.max(...items.map(({ size }) => size), Math.ceil(area / (rows * fill)));
		const placed = { label: group, start, span, skills: scatter(items, span, seeded(i + 1)) };
		start += span + 1;
		return placed;
	});
}

// Drops skills on free spots at random, biggest first while there's room
// for them, and starts over if they box each other in before all of them fit.
function scatter<Item extends { size: number }>(items: Item[], span: number, random: () => number) {
	const order = [...items].sort((a, b) => b.size - a.size);
	for (;;) {
		const placed: (Item & Spot)[] = [];
		for (const item of order) {
			for (let tries = 0; tries < 200; tries++) {
				const spot = {
					row: Math.floor(random() * (rows - item.size + 1)),
					column: Math.floor(random() * (span - item.size + 1)),
				};
				const overlaps = placed.some(
					(p) =>
						spot.row < p.row + p.size &&
						p.row < spot.row + item.size &&
						spot.column < p.column + p.size &&
						p.column < spot.column + item.size,
				);
				if (!overlaps) {
					placed.push({ ...item, ...spot });
					break;
				}
			}
		}
		if (placed.length === items.length) return placed.sort((a, b) => a.column - b.column || a.row - b.row);
	}
}

// Xorshift, seeded per group so editing one group leaves the others in place.
function seeded(seed: number) {
	let state = Math.imul(0x9e3779b9, seed) >>> 0;
	return () => {
		state ^= state << 13;
		state ^= state >>> 17;
		state ^= state << 5;
		return (state >>> 0) / 0x100000000;
	};
}
