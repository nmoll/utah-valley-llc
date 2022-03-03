import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { CalendarEvents } from "../../model/calendar-event.model";
import { CalendarUtil } from "../../util/calendar.util";
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
  events!: CalendarEvents;

  render() {
    const days = CalendarUtil.buildDays(this.events);

    return html`
      ${map(
        days,
        (day) => html`
          <div class="day ${day.isCurrentMonth ? "" : "gray"}">
            ${html`
              <span class="day-label">
                <span class="${day.isToday ? "today-marker" : ""}">
                  ${day.isCurrentMonth ? day.date.getDate() : ""}
                </span>
              </span>
            `}
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
    "utah-calendar": UtahCalendarElement;
  }
}
