// The home page project list shows the first few projects until the visitor
// asks for the rest. The inline script in HomePage.astro collapses it before
// the first paint and reads the same storage key.

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

export function setUpProjectList() {
	const list = document.querySelector<HTMLElement>('[data-projects]');
	const more = document.querySelector<HTMLElement>('[data-projects-more]');
	const button = more?.querySelector('button');
	if (!list || !more || !button) return;

	button.addEventListener('click', () => {
		delete list.dataset.collapsed;
		button.setAttribute('aria-expanded', 'true');
		more.hidden = true;
		try {
			sessionStorage.setItem('projects', 'all');
		} catch {}

		const extras = [...list.querySelectorAll<HTMLElement>('[data-extra]')];
		if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
			extras.forEach((project, i) =>
				project.animate(
					{ opacity: [0, 1], transform: ['translateY(16px)', 'none'] },
					{ duration: 420, delay: i * 70, easing: EASE_OUT, fill: 'backwards' },
				),
			);
		}
		// The button is gone, so keep keyboard focus where the list continues.
		extras[0]?.querySelector<HTMLElement>('.project-title a')?.focus({ preventScroll: true });
	});
}
