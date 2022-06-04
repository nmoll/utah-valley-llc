import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-location-icon")
export class UtahLocationIconElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }
  `;

  render() {
    return html` <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16px"
      viewBox="0 0 24 24"
      width="16px"
      fill="var(--gray-400)"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
      />
      <circle cx="12" cy="9" r="2.5" />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-location-icon": UtahLocationIconElement;
  }
}
