import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("utah-calendar-header")
export class UtahCalendarHeaderElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      background: var(--slate-900);
      padding: 0.75rem;
      color: var(--primary-400);
      font-weight: 200;
      font-size: 1.25rem;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
        drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    }

    @media print {
      :host {
        filter: none;
        color: black;
      }
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
