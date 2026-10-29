// Hover cards (like the timeline's stops) open on hover or focus. Escape
// hides an open card until the pointer or focus moves on, so it never has to
// stay over the page.

export function setUpCards() {
	const cards = [...document.querySelectorAll<HTMLElement>('[data-card]')];
	for (const card of cards) {
		const reset = () => delete card.dataset.dismissed;
		card.addEventListener('pointerleave', reset);
		card.addEventListener('focusout', reset);
	}

	addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		for (const card of cards) if (card.matches(':hover, :focus-within')) card.dataset.dismissed = '';
	});
}
