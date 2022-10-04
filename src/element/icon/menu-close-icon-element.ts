import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-menu-close-icon")
export class MenuCloseIconElement extends LitElement {
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
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-menu-close-icon": MenuCloseIconElement;
  }
}
