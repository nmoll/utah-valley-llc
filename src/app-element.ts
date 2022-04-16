import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./element/admin/admin-page-element";
import "./element/calendar/calendar-page-element";

@customElement("llcuv-app")
export class UtahAppElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  render() {
    if (window.location.pathname.includes("admin")) {
      return html`<llcuv-admin-page></llcuv-admin-page>`;
    }

    return html`<llcuv-calendar-page></llcuv-calendar-page`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-app": UtahAppElement;
  }
}
