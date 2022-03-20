import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-bible-class-leader-icon")
export class UtahBibleClassLeaderElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }
  `;

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      height="16px"
      viewBox="0 0 24 24"
      width="16px"
      fill="#4b5563"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-bible-class-leader-icon": UtahBibleClassLeaderElement;
  }
}
