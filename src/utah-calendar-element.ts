import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import "./bible-class-leader-icon-element";
import "./pianist-icon-element";
import "./service-host-icon-element";

interface Event {
  description: string;
  host: string;
  bibleClass?: string;
  pianists: string[];
}

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  event: Event | null;
}

const weekDayNames: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const monthNames: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const events: Record<string, Event> = {
  "2-2": {
    description: "7pm Song Services",
    host: "Trav & Hayley",
    pianists: ["Nate", "Emily"],
  },
  "2-6": {
    description: "10:30am Services",
    host: "Kenton & Katie",
    pianists: ["Tristan"],
  },
  "2-9": {
    description: "7pm Bible Class",
    host: "Bryce & Emily",
    bibleClass: "Eric",
    pianists: ["Haley B"],
  },
  "2-13": {
    description: "10:30am Services",
    host: "Trav & Hayley",
    pianists: ["Hayley S"],
  },
  "2-16": {
    description: "7pm Bible Class",
    host: "Eric & Janell",
    bibleClass: "Matt",
    pianists: ["Nate"],
  },
  "2-20": {
    description: "10:30am Services",
    host: "Bryce & Emily",
    pianists: ["Emily"],
  },
  "2-23": {
    description: "7pm Bible Class",
    host: "Draper Guys",
    bibleClass: "Chad",
    pianists: ["Tristan"],
  },
  "2-27": {
    description: "10:30am Services",
    host: "Eric & Janell",
    pianists: ["Haley B"],
  },
  "2-30": {
    description: "7pm Bible Class",
    host: "Matt, Chad, Alan",
    bibleClass: "Cody",
    pianists: ["Haley S"],
  },
};

@customElement("utah-calendar")
export class UtahCalendarElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .header {
      text-align: center;
      width: 100%;
      background: #0e7490;
      padding: 0.75rem;
      color: white;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      width: 100%;
      height: calc(100% - 38px);
    }

    .calendar.mobile {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .calendar.mobile .day {
      min-height: 130px;
    }

    .day {
      border: 1px solid #e5e7eb;
      padding: 0.25rem;
      padding-left: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .day.gray {
      background: #e5e7eb;
    }

    .event-detail {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .today {
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

    .flex {
      display: flex;
    }

    .text-gray {
      color: gray;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .text-center {
      text-align: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .bold {
      font-weight: 500;
    }
  `;

  days = Array.from(new Array(35)).map((_, idx) => idx);

  @state()
  isMobile = false;

  constructor() {
    super();

    this.isMobile = document.body.getBoundingClientRect().width < 768;

    let resizeTimer = 0;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        console.log("resize");
        this.isMobile = document.body.getBoundingClientRect().width < 768;
      }, 250);
    });
  }

  render() {
    return html`
      <div class="header">Utah Valley LLC Schedule</div>
      <div class="calendar ${this.isMobile ? "mobile" : ""}">
        ${map(
          this.buildDays(),
          (day) =>
            html`<div class="day ${day.isCurrentMonth ? "" : "gray"}">
              ${this.isMobile
                ? html`
                    <span class="flex justify-between text-gray text-sm">
                      <span>${weekDayNames[day.date.getDay()]}</span>
                      <span>
                        ${monthNames[day.date.getMonth()]} ${day.date.getDate()}
                      </span>
                    </span>
                  `
                : html`<span class="text-gray text-center"
                    ><span class="${day.isToday ? "today" : ""}"
                      >${day.isCurrentMonth ? day.date.getDate() : ""}</span
                    ><span></span
                  ></span>`}
              ${day.event
                ? html`
                    <span class="bold">${day.event.description}</span>
                    <span class="event-detail">
                      <utah-service-host-icon></utah-service-host-icon>
                      ${day.event.host}
                    </span>
                    ${day.event.bibleClass
                      ? html`
                          <span class="event-detail">
                            <utah-bible-class-leader-icon></utah-bible-class-leader-icon>
                            ${day.event.bibleClass}
                          </span>
                        `
                      : ""}
                    <span class="event-detail">
                      <utah-pianist-icon></utah-pianist-icon>
                      ${day.event.pianists.join(", ")}
                    </span>
                  `
                : ""}
            </div>`
        )}
      </div>
    `;
  }

  private buildDays(): Day[] {
    const today = new Date();
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDay();

    const result: Day[] = [];
    let day = 0 - startOfMonth;
    while (result.length < 35) {
      const date = new Date(today.getFullYear(), today.getMonth(), day++);
      const isCurrentMonth = date.getMonth() === today.getMonth();
      const isToday = isCurrentMonth && date.getDate() === today.getDate();

      result.push({
        date,
        isCurrentMonth,
        isToday,
        event: events[`${date.getMonth()}-${date.getDate()}`] ?? null,
      });
    }

    if (this.isMobile) {
      return result.filter((day) => !!day.event);
    }
    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar": UtahCalendarElement;
  }
}
