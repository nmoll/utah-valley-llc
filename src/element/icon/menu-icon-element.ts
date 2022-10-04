import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-menu-icon")
export class MenuIconElement extends LitElement {
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
      fill="var(--primary-700)"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-menu-icon": MenuIconElement;
  }
}
