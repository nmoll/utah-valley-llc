import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-calendar-header")
export class UtahCalendarHeaderElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      background: #115e59;
      padding: 0.75rem;
      color: white;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
        drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar-header": UtahCalendarHeaderElement;
  }
}
