import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { WindowUtil } from "../../util/window.util";
import "./calendar-element";
import "./calendar-header-element";
import "./calendar-mobile-element";
import { CalendarStore } from "./calendar-store";

@customElement("llcuv-calendar-page")
export class UtahCalendarPageElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  @state()
  isMobile = WindowUtil.isMobile();

  @state()
  calendarEvents: CalendarEvent[] = [];

  constructor() {
    super();

    WindowUtil.resize(() => {
      this.isMobile = WindowUtil.isMobile();
    });

    CalendarStore.getInstance().calendarEvents$.then((calendarEvents) => {
      this.calendarEvents = calendarEvents;
    });
  }

  render() {
    if (!this.calendarEvents.length) {
      return "";
    }

    return this.isMobile
      ? html`<llcuv-calendar-mobile
          .events="${this.calendarEvents}"
        ></llcuv-calendar-mobile>`
      : html`<llcuv-calendar
          .events="${this.calendarEvents}"
        ></llcuv-calendar>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar-page": UtahCalendarPageElement;
  }
}
