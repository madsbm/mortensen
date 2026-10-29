// Paints the hidden artwork the binary backdrop resolves under the cursor.
// Asciify only draws glyphs where the content differs from the page colour,
// and picks blank, 1 or 0 from how strongly it differs. The canvas itself is
// never seen; its tones only decide which digit lands in each cell.
//
// Per-cell noise gives a scattered mix of 1s and 0s. Accent shapes in the
// margins tint the digits there, and the same shapes mask the effect's
// output: digits only stand out inside a shape, outside the text column and
// clear of the profile rail. They also stand out in the empty space at the
// top of a page, above an element marked data-backdrop-zone. Everywhere else
// they stay at the faintest level.

const NOISE = 0.4;
const ACCENT = '255 79 31';
// The faintest level, as a fraction of the strongest.
const FAINT = 0.16;
// The level in the empty space at the top, and how far above the marked
// element it fades out.
const TOP = 0.8;
const TOP_FADE = 120;
// Positions are fractions of the screen, radii fractions of its longer side.
// The rail sits bottom left, so that corner is left out. The one at the top
// centre only tints the space at the top; the margins cut the rest of it.
const shapes = [
	{ x: 0, y: 0.18, r: 0.42, alpha: 0.5 },
	{ x: 1, y: 0.28, r: 0.46, alpha: 0.55 },
	{ x: 1, y: 0.92, r: 0.38, alpha: 0.45 },
	{ x: 0.5, y: 0, r: 0.32, alpha: 0.3 },
];

export function paintBackdrop() {
	const canvas = document.querySelector<HTMLCanvasElement>('[data-backdrop-art]');
	const ctx = canvas?.getContext('2d');
	const root = canvas?.closest<HTMLElement>('[data-fx-options]');
	if (!canvas || !ctx || !root) return;

	// Mask layers, top first, each composited onto the result of those below:
	// the shapes are unioned, cut to the margins (BinaryBackdrop.astro defines
	// those layers), then the space at the top and the faint level are added
	// over everything. --top-zone is where that space ends on screen.
	const layers = [
		[`linear-gradient(rgb(0 0 0 / ${FAINT}) 0 0)`, 'add'],
		[
			`linear-gradient(rgb(0 0 0 / ${TOP}) calc(var(--top-zone, 0px) - ${TOP_FADE}px), transparent var(--top-zone, 0px))`,
			'add',
		],
		['var(--backdrop-margins)', 'intersect'],
		['var(--backdrop-rail)', 'intersect'],
		...shapes.map(({ x, y, r }) => [
			`radial-gradient(circle ${r * 100}vmax at ${x * 100}% ${y * 100}%, #000, transparent)`,
			'add',
		]),
	];
	root.style.setProperty('--backdrop-mask', layers.map(([image]) => image).join(', '));
	root.style.setProperty('--backdrop-composite', layers.map(([, operator]) => operator).join(', '));

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

	const zone = document.querySelector<HTMLElement>('[data-backdrop-zone]');
	if (zone) followTopZone(root, zone);
}

// The backdrop is fixed to the screen, but the space at the top belongs to
// the page, so its edge moves up as the page scrolls, until it's gone.
function followTopZone(root: HTMLElement, zone: HTMLElement) {
	let top = 0;
	let shown = -1;
	const update = () => {
		const edge = Math.max(0, Math.round(top - scrollY));
		if (edge === shown) return;
		shown = edge;
		root.style.setProperty('--top-zone', `${edge}px`);
	};
	const measure = () => {
		top = zone.getBoundingClientRect().top + scrollY;
		update();
	};

	let frame = 0;
	function onScroll() {
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			update();
		});
	}

	addEventListener('scroll', onScroll, { passive: true });
	new ResizeObserver(measure).observe(document.documentElement);
	document.fonts.ready.then(measure);
	measure();
}
