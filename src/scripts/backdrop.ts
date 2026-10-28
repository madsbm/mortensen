// Paints the hidden artwork the binary backdrop resolves under the cursor.
// Asciify only draws glyphs where the content differs from the page colour,
// and picks blank, 1 or 0 from how strongly it differs. The canvas itself is
// never seen; its tones only decide which digit lands in each cell.
//
// Per-cell noise gives a scattered mix of 1s and 0s, and a few soft shapes
// make the field denser (more 0s) and tint it with the accent.

const NOISE = 0.4;
const shapes = [
	{ x: 0.86, y: 0.08, r: 0.62, rgb: '255 79 31', alpha: 0.35 },
	{ x: 0.08, y: 0.42, r: 0.7, rgb: '11 11 12', alpha: 0.18 },
	{ x: 0.62, y: 1.02, r: 0.75, rgb: '11 11 12', alpha: 0.22 },
];

export function paintBackdrop() {
	const canvas = document.querySelector<HTMLCanvasElement>('[data-backdrop-art]');
	const ctx = canvas?.getContext('2d');
	if (!canvas || !ctx) return;

	// Match Asciify's glyph cell so every cell samples exactly one noise block.
	const root = canvas.closest<HTMLElement>('[data-fx-options]');
	const { scale = 2, spacing = 1 } = JSON.parse(root?.dataset.fxOptions ?? '{}');
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
		for (const { x, y, r, rgb, alpha } of shapes) {
			const cx = x * width;
			const cy = y * height;
			const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * size);
			gradient.addColorStop(0, `rgb(${rgb} / ${alpha})`);
			gradient.addColorStop(1, `rgb(${rgb} / 0)`);
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
		}
	};

	draw();
	new ResizeObserver(draw).observe(canvas);
}
