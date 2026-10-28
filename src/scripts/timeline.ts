// The about timeline shows each stop's details in a card on hover or focus.
// Escape hides an open card until the pointer or focus moves on, so it never
// has to stay over the page.

export function setUpTimeline() {
	const stops = [...document.querySelectorAll<HTMLElement>('[data-stop]')];
	for (const stop of stops) {
		const reset = () => delete stop.dataset.dismissed;
		stop.addEventListener('pointerleave', reset);
		stop.addEventListener('focusout', reset);
	}

	addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') return;
		for (const stop of stops) if (stop.matches(':hover, :focus')) stop.dataset.dismissed = '';
	});
}
