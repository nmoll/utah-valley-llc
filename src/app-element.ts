import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { bibleClassLeaders } from "./db/bible-class-leaders";
import { hosts } from "./db/hosts";
import { pianists } from "./db/pianists";
import { scheduleUpdates } from "./db/schedule-updates";
import "./element/calendar/calendar-element";
import "./element/calendar/calendar-header-element";
import "./element/calendar/calendar-mobile-element";
import { EventScheduler } from "./event-scheduler/event-scheduler";
import { CalendarEvent } from "./model/calendar-event.model";
import { WindowUtil } from "./util/window.util";

@customElement("utah-app")
export class UtahAppElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  @state()
  isMobile = WindowUtil.isMobile();

  eventScheduler = new EventScheduler({
    hosts: hosts,
    bibleClassLeaders: bibleClassLeaders,
    pianists: pianists,
    scheduleUpdates: scheduleUpdates,
  });

  calendarEvents: CalendarEvent[] = this.eventScheduler.scheduleAll(
    dayjs().startOf("month"),
    dayjs().add(2, "month").endOf("month")
  );

  constructor() {
    super();

    WindowUtil.resize(() => {
      this.isMobile = WindowUtil.isMobile();
    });
  }

  render() {
    return this.isMobile
      ? html`<utah-calendar-mobile
          .events="${this.calendarEvents}"
        ></utah-calendar-mobile>`
      : html`<utah-calendar .events="${this.calendarEvents}"></utah-calendar>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-app": UtahAppElement;
  }
}
