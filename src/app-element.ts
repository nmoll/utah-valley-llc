import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./element/calendar/calendar-element";
import "./element/calendar/calendar-header-element";
import "./element/calendar/calendar-mobile-element";
import { EventScheduler } from "./event-scheduler/event-scheduler";
import { CalendarEvent } from "./model/calendar-event.model";
import { AdminService } from "./service/admin.service";
import { HttpService } from "./service/http.service";
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

  @state()
  calendarEvents: CalendarEvent[] = [];

  adminService = new AdminService(new HttpService());

  constructor() {
    super();

    WindowUtil.resize(() => {
      this.isMobile = WindowUtil.isMobile();
    });

    Promise.all([
      this.adminService.getHosts(),
      this.adminService.getPianists(),
      this.adminService.getBibleClassLeaders(),
      this.adminService.getScheduleUpdates(),
    ]).then(([hosts, pianists, bibleClassLeaders, scheduleUpdates]) => {
      const scheduler = new EventScheduler({
        hosts,
        pianists,
        bibleClassLeaders,
        scheduleUpdates,
      });

      this.calendarEvents = scheduler.scheduleAll(
        dayjs().startOf("month"),
        dayjs().add(2, "month").endOf("month")
      );
    });
  }

  render() {
    if (!this.calendarEvents.length) {
      return "";
    }

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
