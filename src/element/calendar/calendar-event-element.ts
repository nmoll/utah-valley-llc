import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import "../icon/bible-class-leader-icon-element";
import "../icon/food-committee-icon-element";
import "../icon/location-icon-element";
import "../icon/pianist-icon-element";
import "../icon/service-host-icon-element";
import "../icon/service-director-icon-element";
import { foodCommitteeByDate } from "./food-committees";

@customElement("llcuv-calendar-event")
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
      color: var(--gray-900);
      font-weight: 200;
    }

    .event-description {
      font-size: 1.125rem;
      color: var(--gray-900);
    }
  `;

  @property()
  event!: CalendarEvent;

  render() {
    return html`
      <span class="event-description">${this.event.description}</span>
      <span class="event-detail">
        <llcuv-service-host-icon></llcuv-service-host-icon>
        ${this.event.host.name}
      </span>
      ${this.renderFoodCommittee()}
      ${this.event.bibleClassLeader &&
      this.event.bibleClassLeader.name !== "none"
        ? html`
            <span class="event-detail">
              <llcuv-bible-class-leader-icon></llcuv-bible-class-leader-icon>
              ${this.event.bibleClassLeader.name}
            </span>
          `
        : ""}
      <div class="event-detail">
        <llcuv-service-director-icon></llcuv-service-director-icon>
        <div>${this.event.serviceDirector?.name ?? ""}</div>
      </div>
      <span class="event-detail">
        <llcuv-pianist-icon></llcuv-pianist-icon>
        ${this.event.pianists.map((p) => p.name).join(", ")}
      </span>
    `;
  }

  private renderFoodCommittee() {
    const foodCommittee =
      foodCommitteeByDate[this.event.date.format("YYYY-MM-DD")];
    if (!foodCommittee) {
      return "";
    }

    return html`
      <div class="event-detail">
        <llcuv-food-committee-icon></llcuv-food-committee-icon>
        <div>
          ${foodCommittee.people.map((name) => html`<div>${name}</div>`)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar-event": UtahCalendarEventElement;
  }
}
