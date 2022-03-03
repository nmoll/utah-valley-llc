import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvents } from "../../model/calendar-event.model";
import { CalendarUtil } from "../../util/calendar.util";
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
  events!: CalendarEvents;

  render() {
    const days = CalendarUtil.filterByFutureEvent(
      CalendarUtil.buildDays(this.events)
    );

    return html`
      ${map(
        days,
        (day) =>
          html`
            <div class="day">
              <span class="day-label">
                <span>${CalendarUtil.getWeekDayName(day.date)}</span>
                <span>
                  ${CalendarUtil.getMonthName(day.date)} ${day.date.getDate()}
                </span>
              </span>
              ${day.event
                ? html`<utah-calendar-event
                    .event="${day.event}"
                  ></utah-calendar-event>`
                : ""}
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
