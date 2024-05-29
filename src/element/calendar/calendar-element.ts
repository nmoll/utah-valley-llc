import dayjs, { Dayjs } from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUtil } from "../../util/schedule.util";
import "../icon/chevron-left-icon-element";
import "../icon/chevron-right-icon-element";
import "./calendar-event-element";

@customElement("llcuv-calendar")
export class UtahCalendarElement extends LitElement {
  static styles = css`
    :host {
      height: calc(100% - 47px);
      display: block;
    }

    llcuv-calendar-header {
      col-span: 7;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      width: 100%;
      height: 100%;
    }

    .day {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--gray-200);
      padding: 0.25rem;
      padding-left: 0.5rem;
      gap: 0.5rem;
    }

    .day__out-of-month {
      background: var(--gray-100);
    }

    .today-marker {
      background: var(--primary-600);
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      position: relative;
      padding: 0.125rem;
    }

    .day-label {
      color: var(--gray-400);
      text-align: center;
    }

    button {
      border: 0;
      cursor: pointer;
      border-radius: 50%;
      background: var(--primary-600);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .month-label {
      width: 7rem;
      display: inline-block;
    }

    @media print {
      .today-marker {
        color: inherit;
      }
      button {
        display: none;
      }
    }
  `;

  @property()
  events!: CalendarEvent[];

  @state()
  month = dayjs();

  @property()
  bibleClassLeaders!: Record<string, string>;

  constructor() {
    super();
  }

  render() {
    return html`
      <llcuv-calendar-header>
        <button @click="${() => this.previous()}" type="button">
          <llcuv-chevron-left-icon></llcuv-chevron-left-icon>
        </button>
        <span class="month-label">${this.month.format("MMMM")}</span>
        <button @click="${() => this.next()}" type="button">
          <llcuv-chevron-right-icon></llcuv-chevron-right-icon>
        </button>
      </llcuv-calendar-header>
      <div class="calendar">
        ${map(this.getWeeks(), (date) => {
          const event = this.events.find((event) =>
            event.date.isSame(date, "day")
          );
          return html`
            <div
              class="day ${date.isSame(this.month, "month")
                ? ""
                : "day__out-of-month"}"
            >
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
                ? html`<llcuv-calendar-event
                    .event="${event}"
                    .bibleClassLeaders="${this.bibleClassLeaders}"
                  ></llcuv-calendar-event>`
                : ""}
            </div>
          `;
        })}
      </div>
    `;
  }

  private getWeeks(): Dayjs[] {
    const start = this.month.startOf("month").startOf("week");
    const end = start.add(34, "day");

    return ScheduleUtil.getDatesBetween(start, end);
  }

  private next() {
    this.month = this.month.add(1, "month");
  }

  private previous() {
    this.month = this.month.subtract(1, "month");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar": UtahCalendarElement;
  }
}
