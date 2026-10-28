// Upgrades every [data-fx] wrapper (see CanvasFx.astro) into a Canvas UI
// effect once the page is idle. With html-in-canvas the content is moved into
// the source canvas so the effect can sample the live DOM; without it, an
// effect either runs as an overlay or, if marked native-only, is skipped.

interface Effect {
	destroy(): void;
	splash?(x: number, y: number, strength?: number): void;
}

interface Elements {
	source: HTMLCanvasElement;
	content: HTMLElement;
	output: HTMLCanvasElement;
}

interface Module {
	create(elements: Elements, options: object): Effect | null;
	supports(): boolean;
}

const effects: Record<string, () => Promise<Module>> = {
	glass: () =>
		import('../lib/canvasui/GlassVanilla').then((m) => ({
			create: m.createGlass,
			supports: m.supportsHtmlInCanvas,
		})),
	ripple: () =>
		import('../lib/canvasui/RippleVanilla').then((m) => ({
			create: m.createRipple,
			supports: m.supportsHtmlInCanvas,
		})),
};

export interface SplashDetail {
	x: number;
	y: number;
	strength?: number;
}

const whenIdle = (fn: () => void) =>
	'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200);

export function mountEffects() {
	for (const root of document.querySelectorAll<HTMLElement>('[data-fx]')) {
		const media = root.dataset.fxMedia;
		if (media && !matchMedia(media).matches) continue;
		whenIdle(() => mount(root).catch((error) => console.warn('Canvas effect failed to mount:', error)));
	}
}

async function mount(root: HTMLElement) {
	const load = effects[root.dataset.fx ?? ''];
	const source = root.querySelector<HTMLCanvasElement>('.fx-source');
	const content = root.querySelector<HTMLElement>('.fx-content');
	const output = root.querySelector<HTMLCanvasElement>('.fx-output');
	if (!load || !source || !content || !output) return;

	const effect = await load();
	const native = effect.supports();
	if (!native && root.hasAttribute('data-fx-native-only')) return;

	const stopSizing = native ? enterCanvas(root, source, content) : () => {};
	const options = JSON.parse(root.dataset.fxOptions ?? '{}');
	const instance = effect.create({ source, content, output }, options);

	if (!instance) {
		stopSizing();
		if (native) {
			root.insertBefore(content, output);
			source.hidden = true;
		}
		return;
	}

	root.dataset.fxReady = native ? 'native' : 'overlay';
	root.addEventListener('fx:splash', (event) => {
		const { x, y, strength } = (event as CustomEvent<SplashDetail>).detail;
		instance.splash?.(x, y, strength);
	});
}

/** Moves the content into the source canvas. Content inside a canvas is
 *  absolutely sized, so a `fit` wrapper is kept as tall as its content. */
function enterCanvas(root: HTMLElement, source: HTMLCanvasElement, content: HTMLElement) {
	const inner = content.firstElementChild as HTMLElement | null;
	let observer: ResizeObserver | undefined;

	if (root.dataset.fxSizing !== 'fill' && inner) {
		const sync = () => (root.style.height = `${inner.offsetHeight}px`);
		sync();
		observer = new ResizeObserver(sync);
		observer.observe(inner);
	}

	source.hidden = false;
	source.append(content);

	return () => {
		observer?.disconnect();
		root.style.height = '';
	};
}
