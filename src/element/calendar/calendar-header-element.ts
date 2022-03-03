import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-calendar-header")
export class UtahCalendarHeaderElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      background: #0e7490;
      padding: 0.75rem;
      color: white;
    }
  `;

  render() {
    return html`Utah Valley LLC Schedule `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar-header": UtahCalendarHeaderElement;
  }
}
