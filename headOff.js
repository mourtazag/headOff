import { throttle } from '../modules/utils.js';

export default function headOff(element, options) {
	if (element === undefined || !(element instanceof HTMLElement)) return;

	const tolerance = options ? options.tolerance : 70;
	const fromTop = options ? options.fromTop : element.offsetHeight;
	let lastScroll = window.pageYOffset;

	window.addEventListener('scroll', throttle(headerVisibility, 150));
	headerVisibility();

	function headerVisibility() {
		const currentScroll = window.pageYOffset;

		if (Math.abs(currentScroll - lastScroll) < tolerance && Math.abs(currentScroll - lastScroll) > 0) return;

		if (currentScroll < lastScroll || lastScroll <= fromTop) {
			element.classList.add('headOff-is-visible');
		} else {
			element.classList.remove('headOff-is-visible');
		}

		lastScroll = currentScroll;
	}
}
