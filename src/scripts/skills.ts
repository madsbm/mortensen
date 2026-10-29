// The skill grid is a single stop in the tab order. Arrow keys, Home and End
// move between its skills from left to right, and the focused one shows its
// name. With a mouse, the folded languages open while the pointer is near
// them.

// How close the pointer has to come to the middle of the languages.
const reach = 100;

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

	openLanguagesNearby(grid);
}

// Measured rather than hovered, so the circle reaches over the neighbouring
// block without taking its squares' own hover away.
function openLanguagesNearby(grid: HTMLElement) {
	const languages = grid.querySelector<HTMLElement>('[data-languages]');
	if (!languages || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	let x = -Infinity;
	let y = -Infinity;
	let frame = 0;
	const update = () => {
		frame = 0;
		const box = languages.getBoundingClientRect();
		const near = Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2)) <= reach;
		languages.toggleAttribute('data-open', near);
	};
	const schedule = () => {
		frame ||= requestAnimationFrame(update);
	};

	addEventListener(
		'pointermove',
		(event) => {
			x = event.clientX;
			y = event.clientY;
			schedule();
		},
		{ passive: true },
	);
	// The page can also scroll the languages away from a pointer at rest.
	addEventListener('scroll', schedule, { passive: true });
	document.documentElement.addEventListener('pointerleave', () => {
		x = y = -Infinity;
		schedule();
	});
}
