import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-chevron-right-icon")
export class UtahChevronRightIconElement extends LitElement {
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
      fill="white"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-chevron-right-icon": UtahChevronRightIconElement;
  }
}
