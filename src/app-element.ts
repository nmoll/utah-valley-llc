import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { calendarEvents } from "./db/events";
import "./element/calendar/calendar-element";
import "./element/calendar/calendar-header-element";
import "./element/calendar/calendar-mobile-element";
import { WindowUtil } from "./util/window.util";

@customElement("utah-app")
export class UtahAppElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    utah-calendar {
      height: calc(100% - 38px);
    }
  `;

  @state()
  isMobile = WindowUtil.isMobile();

  constructor() {
    super();

    WindowUtil.resize(() => {
      this.isMobile = WindowUtil.isMobile();
    });
  }

  render() {
    return html` <utah-calendar-header></utah-calendar-header>
      ${this.isMobile
        ? html`<utah-calendar-mobile
            .events="${calendarEvents}"
            .isMobile="${this.isMobile}"
          ></utah-calendar-mobile>`
        : html`<utah-calendar
            .events="${calendarEvents}"
            .isMobile="${this.isMobile}"
          ></utah-calendar>`}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-app": UtahAppElement;
  }
}
