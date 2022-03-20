import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-chevron-left-icon")
export class UtahChevronLeftIconElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }
  `;

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="var(--primary-500)"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-chevron-left-icon": UtahChevronLeftIconElement;
  }
}
