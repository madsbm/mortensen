import { decode } from '../lib/obfuscate';
import type { Dictionary } from '../i18n/ui';
import type { SplashDetail } from './fx';

type Strings = Dictionary['contact']['client'];

// The address is only decoded inside handlers for trusted (real user) events.
function address(el: HTMLElement) {
	return decode(el.dataset.mx ?? '', el.dataset.mk ?? '');
}

async function copy(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

export function setUpContact() {
	const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
	const reveal = document.querySelector<HTMLElement>('[data-address]');
	const status = form?.querySelector<HTMLElement>('[data-status]');
	// Localised copy, rendered into the page by ContactForm.astro.
	const t: Strings = JSON.parse(form?.dataset.strings ?? '{}');

	reveal?.querySelector('[data-reveal]')?.addEventListener('click', (event) => {
		if (!event.isTrusted) return;
		const email = address(reveal);

		const link = document.createElement('a');
		link.className = 'email';
		link.href = `mailto:${email}`;
		link.textContent = email;

		const copyButton = document.createElement('button');
		copyButton.type = 'button';
		copyButton.className = 'button button-ghost';
		copyButton.textContent = t.copy;
		copyButton.addEventListener('click', async () => {
			copyButton.textContent = (await copy(email)) ? t.copied : t.copyFailed;
			setTimeout(() => (copyButton.textContent = t.copy), 1600);
		});

		reveal.replaceChildren(link, copyButton);
		link.focus();
	});

	form?.addEventListener('submit', (event) => {
		event.preventDefault();
		if (!event.isTrusted || !form.reportValidity()) return;

		const data = new FormData(form);
		const name = String(data.get('name') ?? '').trim();
		const subject = String(data.get('subject') ?? '').trim() || t.defaultSubject.replace('{name}', name);
		const message = String(data.get('message') ?? '').trim();
		const body = `${message}\n\n${name}`;

		const email = address(form);
		const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`;
		location.href = `mailto:${email}?${params}`;

		splash(form, (event as SubmitEvent).submitter);
		showStatus(email);
	});

	function showStatus(email: string) {
		if (!status) return;
		status.textContent = t.opening;
		setTimeout(() => {
			const button = document.createElement('button');
			button.type = 'button';
			button.textContent = t.fallbackButton;
			button.addEventListener('click', async () => {
				status.textContent = (await copy(email)) ? t.copiedToClipboard : email;
			});
			status.replaceChildren(t.fallbackBefore, button, t.fallbackAfter);
		}, 2400);
	}
}

/** Sends a ripple out from the submit button when the effect is mounted. */
function splash(form: HTMLFormElement, from: HTMLElement | null) {
	const fx = form.closest<HTMLElement>('[data-fx-ready]');
	if (!fx || !from) return;
	const box = fx.getBoundingClientRect();
	const button = from.getBoundingClientRect();
	const detail: SplashDetail = {
		x: button.left + button.width / 2 - box.left,
		y: button.top + button.height / 2 - box.top,
	};
	fx.dispatchEvent(new CustomEvent('fx:splash', { detail }));
}
