import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { Member } from "../../model/member";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";
import { ScheduleUtil } from "../../util/schedule.util";
import { CalendarStore } from "../calendar/calendar-store";
import { buttonStyles } from "../styles/button-styles";

interface BibleClass {
  bibleClassLeader: string;
  date: dayjs.Dayjs;
}

type BibleClassSchedule = Record<string, string>;

const bibleClassDays = ScheduleUtil.getDatesBetween(
  dayjs(),
  dayjs().add(3, "month")
).filter((date) => date.day() === 3);

@customElement("llcuv-admin-bible-class")
export class UtahAdminBibleClassElement extends LitElement {
  @property()
  calendarEvents!: CalendarEvent[];

  @property()
  bibleClassLeaders: Member[] = [];

  schedule: BibleClassSchedule = {};

  adminService = new AdminService(new HttpService());
  calendarStore = CalendarStore.getInstance();

  @property()
  selected: BibleClass | null = null;

  constructor() {
    super();

    Promise.all([
      this.adminService.getBibleClassLeaders(),
      this.calendarStore.calendarEvents$,
    ]).then(([bibleClassLeaders, calendarEvents]) => {
      console.log(calendarEvents);
      this.bibleClassLeaders = bibleClassLeaders;

      this.schedule = bibleClassDays.reduce((schedule, date) => {
        const calendarEvent = calendarEvents.find((event) =>
          dayjs(event.date).isSame(date, "day")
        );
        return {
          ...schedule,
          [date.format("YYYY-MM-DD")]:
            calendarEvent?.bibleClassLeader?.name || "",
        };
      }, {});
    });
  }

  render() {
    const days = Object.keys(this.schedule);
    return html`
      <div class="container">
        <h1>Bible Class</h1>
        <div class="items">
          ${map(
            days,
            (day) => html`
              <div class="item">
                <div class="date">
                  <span>${dayjs(day).format("MMM DD")}</span>
                </div>
                <select
                  @change="${(e: Event) =>
                    this.optionChanged(
                      day,
                      (e.target as HTMLSelectElement).value
                    )}"
                >
                  <option></option>
                  ${map(
                    this.bibleClassLeaders,
                    (member) =>
                      html`<option
                        value="${member.name}"
                        ?selected="${member.name === this.schedule[day]}"
                      >
                        ${member.name}
                      </option>`
                  )}
                </select>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  optionChanged(day: string, option: string) {
    const bibleClassLeader = this.bibleClassLeaders.find(
      (member) => member.name === option
    );
    if (!bibleClassLeader) {
      return;
    }

    const scheduleUpdate: ScheduleUpdate = {
      date: dayjs(day),
      changes: {
        bibleClassLeader,
      },
    };

    this.adminService.saveScheduleUpdate(scheduleUpdate);
  }

  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      h1 {
        color: var(--primary-700);
      }

      .container {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
      }

      .items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .item {
        display: flex;
        gap: 1rem;
        align-items: center;
        font-size: 1.125rem;
      }

      .date {
        color: var(--primary-700);
        width: 5rem;
        text-align: right;
      }

      select {
        flex: 1;
        height: 2rem;
        font-size: 1.25rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-bible-class": UtahAdminBibleClassElement;
  }
}
