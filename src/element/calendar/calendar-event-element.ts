import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import "../icon/bible-class-leader-icon-element";
import "../icon/pianist-icon-element";
import "../icon/service-host-icon-element";

@customElement("utah-calendar-event")
export class UtahCalendarEventElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .event-detail {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .bold {
      font-weight: 500;
    }
  `;

  @property()
  event!: CalendarEvent;

  render() {
    return html`
      <span class="bold">${this.event.description}</span>
      <span class="event-detail">
        <utah-service-host-icon></utah-service-host-icon>
        ${this.event.host}
      </span>
      ${this.event.bibleClass
        ? html`
            <span class="event-detail">
              <utah-bible-class-leader-icon></utah-bible-class-leader-icon>
              ${this.event.bibleClass}
            </span>
          `
        : ""}
      <span class="event-detail">
        <utah-pianist-icon></utah-pianist-icon>
        ${this.event.pianists.join(", ")}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "utah-calendar-event": UtahCalendarEventElement;
  }
}
