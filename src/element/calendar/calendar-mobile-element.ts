import * as dayjs from "dayjs";
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
      min-height: 130px;
      display: flex;
      flex-direction: column;
      border: 1px solid #e5e7eb;
      padding: 0.25rem;
      padding-left: 0.5rem;
      gap: 0.5rem;
    }

    .day-label {
      display: flex;
      color: gray;
      font-size: 0.875rem;
      justify-content: space-between;
    }
  `;

  @property()
  events!: CalendarEvent[];

  render() {
    return html`
      ${map(
        this.events.filter((event) => !event.date.isBefore(dayjs(), "day")),
        (event) =>
          html`
            <div class="day">
              <span class="day-label">
                <span>${event.date.format("ddd")}</span>
                <span> ${event.date.format("MMM D")} </span>
              </span>
              <utah-calendar-event .event="${event}"></utah-calendar-event>
            </div>
          `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar-mobile": UtahCalendarMobileElement;
  }
}
