import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import "./admin-button-element";

@customElement("llcuv-admin-swap-pianists")
export class UtahAdminSwapPianists extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    p {
      text-align: center;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .swap-icon {
      display: flex;
      justify-content: center;
    }

    .date {
      display: flex;
      flex-direction: column;
      position: absolute;
      color: var(--gray-400);
      left: 1rem;
      top: 10px;
      text-align: left;
      font-size: 0.875rem;
    }

    .active .date {
      color: white;
    }

    .date-month {
      font-size: 0.75rem;
    }

    llcuv-admin-button {
      position: relative;
    }
  `;

  @state()
  selectedA: CalendarEvent | null = null;

  @state()
  selectedB: CalendarEvent | null = null;

  options: CalendarEvent[] = [
    {
      date: dayjs("2022-04-17"),
      pianists: [
        {
          active: dayjs(),
          name: "Nate",
        },
      ],
      description: "",
      bibleClassLeader: {
        active: dayjs(),
        name: "",
      },
      host: {
        active: dayjs(),
        name: "",
      },
    },
    {
      date: dayjs("2022-04-20"),
      pianists: [
        {
          active: dayjs(),
          name: "Emily",
        },
      ],
      description: "",
      bibleClassLeader: {
        active: dayjs(),
        name: "",
      },
      host: {
        active: dayjs(),
        name: "",
      },
    },
    {
      date: dayjs("2022-04-24"),
      pianists: [
        {
          active: dayjs(),
          name: "Hayley S",
        },
      ],
      description: "",
      bibleClassLeader: {
        active: dayjs(),
        name: "",
      },
      host: {
        active: dayjs(),
        name: "",
      },
    },
  ];

  render() {
    return html`
      <p>Swap pianists</p>
      <div class="list">
        <div class="group">
          ${this.getOptionsA().map(
            (option) => html`
              <llcuv-admin-button
                class="${this.selectedA === option ? "active" : ""}"
                .active="${this.selectedA === option}"
                @click="${() => this.toggleSelectA(option)}"
              >
                <span class="date">
                  <span class="date-month">${option.date.format("ddd")}</span>
                  <span>${option.date.format("MMMM D")}</span>
                </span>
                <span
                  >${option.pianists
                    .map((pianist) => pianist.name)
                    .join(", ")}</span
                >
              </llcuv-admin-button>
            `
          )}
        </div>

        <div class="swap-icon">
          <llcuv-swap-icon></llcuv-swap-icon>
        </div>

        <div class="group">
          ${this.getOptionsB().map(
            (option) => html`
              <llcuv-admin-button
                class="${this.selectedB === option ? "active" : ""}"
                .active="${this.selectedB === option}"
                @click="${() => this.toggleSelectB(option)}"
                ><span class="date">
                  <span class="date-month">${option.date.format("ddd")}</span>
                  <span>${option.date.format("MMMM D")}</span>
                </span>
                <span
                  >${option.pianists
                    .map((pianist) => pianist.name)
                    .join(", ")}</span
                ></llcuv-admin-button
              >
            `
          )}
        </div>

        ${this.selectedA && this.selectedB
          ? html`
              <div class="group">
                <llcuv-admin-button @click="${() => this.onConfirm()}"
                  >Confirm</llcuv-admin-button
                >
              </div>
            `
          : ""}
      </div>
    `;
  }

  private onConfirm() {
    if (!this.selectedA || !this.selectedB) {
      return;
    }

    const updates: ScheduleUpdate[] = [
      {
        date: dayjs(),
        changes: {
          pianists: this.selectedA.pianists,
        },
      },
      {
        date: dayjs(),
        changes: {
          pianists: this.selectedB.pianists,
        },
      },
    ];

    this.dispatchEvent(
      new CustomEvent("confirm", {
        detail: {
          updates,
        },
      })
    );
  }

  private getOptionsA(): CalendarEvent[] {
    if (this.selectedA) {
      return [this.selectedA];
    }

    return this.options.filter((option) => option !== this.selectedB);
  }

  private getOptionsB(): CalendarEvent[] {
    if (this.selectedB) {
      return [this.selectedB];
    }

    return this.options.filter((option) => option !== this.selectedA);
  }

  private toggleSelectA(option: CalendarEvent) {
    this.selectedA = this.selectedA === option ? null : option;
  }

  private toggleSelectB(option: CalendarEvent) {
    this.selectedB = this.selectedB === option ? null : option;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-swap-pianists": UtahAdminSwapPianists;
  }
}
