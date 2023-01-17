import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./element/admin/admin-page-element";
import "./element/calendar/calendar-page-element";
import "./element/contact/contact-page-element";
import "./element/donate/donate-page-element";
import "./element/layout/page-layout-element";

const routes: Record<string, TemplateResult> = {
  "/schedule": html`<llcuv-calendar-page></llcuv-calendar-page>`,
  "/contact": html`<llcuv-contact-page></llcuv-contact-page>`,
  "/donate": html`<llcuv-donate-page></llcuv-donate-page>`,
  "/admin": html`<llcuv-admin-page></llcuv-admin-page>`,
};

@customElement("llcuv-app")
export class UtahAppElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  @state()
  route: string = "/schedule";

  constructor() {
    super();

    if (routes[window.location.pathname]) {
      this.route = window.location.pathname;
    } else {
      window.history.replaceState(null, "", this.route);
    }
  }

  render() {
    return html`
      <llcuv-page-layout
        .activeRoute="${this.route}"
        @menu-item-select="${(event: CustomEvent<{ route: string }>) =>
          this.navigate(event.detail.route)}"
        >${routes[this.route]}
      </llcuv-page-layout>
    `;
  }

  private navigate(route: string) {
    if (routes[route]) {
      window.history.pushState(null, "", route);
      this.route = route;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-app": UtahAppElement;
  }
}
