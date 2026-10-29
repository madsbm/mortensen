// The skill grid is a single stop in the tab order. Arrow keys, Home and End
// move between its skills from left to right, and the focused one shows its
// name.

export function setUpSkillGrid() {
	const grid = document.querySelector<HTMLElement>('[data-skill-grid]');
	if (!grid) return;
	const skills = [...grid.querySelectorAll<HTMLElement>('[data-skill]')];
	const last = skills.length - 1;
	const moves: Record<string, (i: number) => number> = {
		ArrowRight: (i) => Math.min(i + 1, last),
		ArrowDown: (i) => Math.min(i + 1, last),
		ArrowLeft: (i) => Math.max(i - 1, 0),
		ArrowUp: (i) => Math.max(i - 1, 0),
		Home: () => 0,
		End: () => last,
	};

	grid.addEventListener('keydown', (event) => {
		const move = moves[event.key];
		const i = skills.indexOf(event.target as HTMLElement);
		if (!move || i === -1) return;
		event.preventDefault();
		skills[move(i)].focus();
	});

	// Tabbing back in lands on the skill that had focus last.
	grid.addEventListener('focusin', (event) => {
		for (const skill of skills) skill.tabIndex = skill === event.target ? 0 : -1;
	});

	// Safari doesn't focus buttons on click or tap, and a tap is how touch
	// screens open a name.
	grid.addEventListener('click', (event) => {
		(event.target as Element).closest<HTMLElement>('[data-skill]')?.focus();
	});
}
