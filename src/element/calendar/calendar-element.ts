import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUtil } from "../../util/schedule.util";
import "./calendar-event-element";

@customElement("utah-calendar")
export class UtahCalendarElement extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      width: 100%;
      height: 100%;
    }

    .day {
      display: flex;
      flex-direction: column;
      border: 1px solid #e5e7eb;
      padding: 0.25rem;
      padding-left: 0.5rem;
      gap: 0.5rem;
    }

    .day.gray {
      background: #e5e7eb;
    }

    .today-marker {
      background: #fda4af;
      color: black;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      position: relative;
    }

    .day-label {
      color: gray;
      text-align: center;
    }
  `;

  @property()
  events!: CalendarEvent[];

  render() {
    return html`
      ${map(this.getWeeks(), (date) => {
        const event = this.events.find((event) =>
          event.date.isSame(date, "day")
        );
        return html`
          <div class="day ${date.isSame(dayjs(), "month") ? "" : "gray"}">
            ${html`
              <span class="day-label">
                <span
                  class="${date.isSame(dayjs(), "day") ? "today-marker" : ""}"
                >
                  ${date.date()}
                </span>
              </span>
            `}
            ${event
              ? html`<utah-calendar-event
                  .event="${event}"
                ></utah-calendar-event>`
              : ""}
          </div>
        `;
      })}
    `;
  }

  private getWeeks(): Dayjs[] {
    const start = dayjs().startOf("month").startOf("week");
    const end = start.add(33, "day");

    return ScheduleUtil.getDatesBetween(start, end);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar": UtahCalendarElement;
  }
}
