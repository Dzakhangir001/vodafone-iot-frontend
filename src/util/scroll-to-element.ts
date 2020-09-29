export default function scrollToElement(element?: Element, offset = 0): void {
  if (!element) {
    return;
  }

  const { top, bottom } = element.getBoundingClientRect();

  const up = top - offset;
  const down = bottom + offset - document.documentElement.clientHeight;

  const currentScrollTop = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
  const scrollTop = up < 0 ? currentScrollTop + up : down > 0 ? currentScrollTop + down : undefined;

  window.scroll({ top: scrollTop, behavior: 'smooth' });
}
