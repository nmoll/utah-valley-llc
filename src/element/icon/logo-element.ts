import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-logo")
export class LogoElement extends LitElement {
  render() {
    return html`<svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" fill="white" />
      <rect x="14" y="2" width="3" height="28" fill="#78350F" />
      <rect x="5" y="9" width="21" height="3" fill="#78350F" />
    </svg> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-logo": LogoElement;
  }
}
