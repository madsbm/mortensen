// The home page breadcrumb follows the section in view. A new slug grows the
// pill open; switching slugs ticks the old text up and out while the new one
// rises in, and the link eases to its new width.

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

export function followSections() {
	const crumb = document.querySelector<HTMLElement>('[data-spy]');
	const link = crumb?.querySelector<HTMLAnchorElement>('.crumb-link');
	const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
	if (!crumb || !link || sections.length === 0) return;

	const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
	let current: string | null = null;

	function sectionInView() {
		// The section crossing a line a third of the way down the viewport wins.
		const line = innerHeight * 0.33;
		for (const section of sections) {
			const { top, bottom } = section.getBoundingClientRect();
			if (top <= line && bottom > line) return section.dataset.section ?? null;
		}
		return null;
	}

	function show(slug: string | null) {
		if (slug === current) return;
		const previous = current;
		current = slug;

		if (!slug) {
			delete crumb!.dataset.shown;
			clipWhileResizing(link!.querySelector('.crumb-text'));
			return;
		}

		link!.href = `#${slug}`;
		if (!previous || reducedMotion.matches) {
			setText(slug);
			crumb!.dataset.shown = '';
			clipWhileResizing(link!.querySelector('.crumb-text'));
			return;
		}
		tick(slug);
	}

	// The label ellipsises when it doesn't fit, which it briefly doesn't while
	// the crumb grows or shrinks around it. Until that settles, it's clipped
	// instead, so it doesn't flash "abo…".
	function clipWhileResizing(label: Element | null) {
		if (!label) return;
		const resizing = () => [...crumb!.getAnimations(), ...link!.getAnimations()];
		label.classList.add('is-resizing');
		Promise.allSettled(resizing().map((animation) => animation.finished)).then(() => {
			// A newer resize took over and will settle the label itself.
			if (resizing().some((animation) => animation.playState === 'running')) return;
			label.classList.remove('is-resizing');
		});
	}

	function setText(text: string) {
		for (const leaving of link!.querySelectorAll('.is-leaving')) leaving.remove();
		const label = link!.querySelector('.crumb-text');
		if (label) label.textContent = text;
	}

	function tick(text: string) {
		for (const animation of link!.getAnimations({ subtree: true })) animation.cancel();
		for (const leaving of link!.querySelectorAll('.is-leaving')) leaving.remove();

		const old = link!.querySelector<HTMLElement>('.crumb-text');
		if (!old) return;
		const from = link!.getBoundingClientRect().width;

		const next = document.createElement('span');
		next.className = 'crumb-text';
		next.textContent = text;
		link!.append(next);

		// Take the old label out of flow so the link measures to the new one.
		old.classList.add('is-leaving');
		old.setAttribute('aria-hidden', 'true');
		Object.assign(old.style, { position: 'absolute', inset: '0 auto 0 0', display: 'grid', alignItems: 'center' });
		const to = link!.getBoundingClientRect().width;

		link!.animate({ width: [`${from}px`, `${to}px`] }, { duration: 320, easing: EASE_OUT });
		clipWhileResizing(next);
		old.animate(
			{ opacity: [1, 0], transform: ['none', 'translateY(-70%)'], filter: ['blur(0)', 'blur(2px)'] },
			{ duration: 200, easing: EASE_OUT, fill: 'forwards' },
		).onfinish = () => old.remove();
		next.animate(
			{ opacity: [0, 1], transform: ['translateY(70%)', 'none'], filter: ['blur(2px)', 'blur(0)'] },
			{ duration: 300, delay: 40, easing: EASE_OUT, fill: 'backwards' },
		);
	}

	let frame = 0;
	function onScroll() {
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			show(sectionInView());
		});
	}

	// Coming back to /#work should already show the slug on the first frame,
	// so the page transition has something to morph from.
	const fromHash = location.hash.slice(1);
	const initial = sections.some((s) => s.dataset.section === fromHash) ? fromHash : sectionInView();
	if (initial) {
		current = initial;
		setText(initial);
		link.href = `#${initial}`;
		crumb.style.transition = 'none';
		crumb.dataset.shown = '';
		crumb.offsetWidth;
		crumb.style.transition = '';
	}

	addEventListener('scroll', onScroll, { passive: true });
	addEventListener('resize', onScroll, { passive: true });
}
