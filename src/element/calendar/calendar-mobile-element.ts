import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import "./calendar-event-element";

@customElement("utah-calendar-mobile")
export class UtahCalendarMobileElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .day {
      display: flex;
      flex-direction: row;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      padding-left: 0;
      padding-bottom: 1.5rem;
    }

    .day-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 6rem;
    }

    .day-label__name {
      color: gray;
      font-size: 0.75rem;
      text-transform: uppercase;
    }

    .day-label__date {
      font-size: 1.5rem;
      color: #0f766e;
    }

    .day-details {
      flex-grow: 1;
    }

    utah-calendar-event {
      width: 100%;
    }

    utah-calendar-header {
      position: sticky;
      top: 0;
    }
  `;

  @property()
  events!: CalendarEvent[];

  render() {
    const futureEvents = this.events.filter(
      (event) => !event.date.isBefore(dayjs(), "day")
    );
    const eventsByMonth = futureEvents.reduce<Record<string, CalendarEvent[]>>(
      (result, event) => {
        const monthName = event.date.format("MMMM");
        const events = result[monthName] ?? [];
        return {
          ...result,
          [monthName]: [...events, event],
        };
      },
      {}
    );

    return map(
      Object.keys(eventsByMonth),
      (month) => html`<div>
        <utah-calendar-header>${month}</utah-calendar-header> ${map(
          eventsByMonth[month],
          (event) =>
            html`
              <div class="day">
                <div class="day-label">
                  <div class="day-label__name">${event.date.format("ddd")}</div>
                  <div class="day-label__date">${event.date.format("D")}</div>
                </div>
                <div class="day-details">
                  <utah-calendar-event .event="${event}"></utah-calendar-event>
                </div>
              </div>
            `
        )}
      </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar-mobile": UtahCalendarMobileElement;
  }
}
