/* Opens the early-access modal from anywhere on the page. */
export const OPEN_ACCESS_EVENT = "klearly:open-access";

export function openAccessModal(source: string) {
  window.dispatchEvent(new CustomEvent(OPEN_ACCESS_EVENT, { detail: source }));
}
