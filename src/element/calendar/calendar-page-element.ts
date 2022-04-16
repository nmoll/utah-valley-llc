import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { EventScheduler } from "../../event-scheduler/event-scheduler";
import { CalendarEvent } from "../../model/calendar-event.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";
import { WindowUtil } from "../../util/window.util";
import "./calendar-element";
import "./calendar-header-element";
import "./calendar-mobile-element";

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
