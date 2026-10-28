// Paints the hidden artwork the binary backdrop resolves under the cursor.
// Asciify only draws glyphs where the content differs from the page colour,
// and picks blank, 1 or 0 from how strongly it differs. The canvas itself is
// never seen; its tones only decide which digit lands in each cell.
//
// Per-cell noise gives a scattered mix of 1s and 0s. Accent shapes along the
// edges of the screen tint the digits there, and the same shapes mask the
// effect's output, so digits fade out towards the centre where the text is.

const NOISE = 0.4;
const ACCENT = '255 79 31';
// Digits left showing in the middle of the screen, as a fraction of the edges.
const CENTRE = 0.06;
// Positions are fractions of the screen, radii fractions of its longer side.
const shapes = [
	{ x: 0, y: 0.14, r: 0.42, alpha: 0.5 },
	{ x: 1, y: 0.32, r: 0.46, alpha: 0.55 },
	{ x: 0.1, y: 1, r: 0.44, alpha: 0.5 },
	{ x: 0.9, y: 1, r: 0.38, alpha: 0.45 },
];

export function paintBackdrop() {
	const canvas = document.querySelector<HTMLCanvasElement>('[data-backdrop-art]');
	const ctx = canvas?.getContext('2d');
	const root = canvas?.closest<HTMLElement>('[data-fx-options]');
	if (!canvas || !ctx || !root) return;

	root.style.setProperty(
		'--backdrop-mask',
		[
			...shapes.map(
				({ x, y, r }) => `radial-gradient(circle ${r * 100}vmax at ${x * 100}% ${y * 100}%, #000, transparent)`,
			),
			`linear-gradient(rgb(0 0 0 / ${CENTRE}) 0 0)`,
		].join(', '),
	);

	// Match Asciify's glyph cell so every cell samples exactly one noise block.
	const { scale = 2, spacing = 1 } = JSON.parse(root.dataset.fxOptions ?? '{}');
	const cell = (5 + 2 * spacing) * scale;

	// Seeded so the field doesn't reshuffle on every resize.
	let seed = 0x9e3779b9;
	const random = () => {
		seed ^= seed << 13;
		seed ^= seed >>> 17;
		seed ^= seed << 5;
		return (seed >>> 0) / 0xffffffff;
	};

	const draw = () => {
		const dpr = Math.min(devicePixelRatio || 1, 2);
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		if (!width || !height) return;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
		ctx.fillRect(0, 0, width, height);

		seed = 0x9e3779b9;
		for (let y = 0; y < height; y += cell) {
			for (let x = 0; x < width; x += cell) {
				ctx.fillStyle = `rgb(11 11 12 / ${random() * NOISE})`;
				ctx.fillRect(x, y, cell, cell);
			}
		}

		const size = Math.max(width, height);
		for (const { x, y, r, alpha } of shapes) {
			const cx = x * width;
			const cy = y * height;
			const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * size);
			gradient.addColorStop(0, `rgb(${ACCENT} / ${alpha})`);
			gradient.addColorStop(1, `rgb(${ACCENT} / 0)`);
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
		}
	};

	draw();
	new ResizeObserver(draw).observe(canvas);
}
