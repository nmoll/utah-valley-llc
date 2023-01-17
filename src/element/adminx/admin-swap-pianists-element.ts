import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import { buttonStyles } from "../styles/button-styles";

@customElement("llcuv-admin-swap-pianists")
export class UtahAdminSwapPianistsElement extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      p {
        text-align: center;
        color: var(--primary-500);
        font-size: 2rem;
      }

      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .swap-icon {
        display: flex;
        justify-content: center;
      }

      .date {
        display: flex;
        flex-direction: column;
        position: absolute;
        color: var(--gray-500);
        left: 1rem;
        top: 10px;
        text-align: left;
        font-size: 0.875rem;
      }

      .button--primary .date {
        color: white;
      }

      .date-month {
        font-size: 0.75rem;
      }

      button {
        position: relative;
      }

      .bottom {
        justify-self: end;
      }
    `,
  ];

  @property()
  calendarEvents!: CalendarEvent[];

  @state()
  selectedA: CalendarEvent | null = null;

  @state()
  selectedB: CalendarEvent | null = null;

  render() {
    return html`
      <p>Swap pianists</p>
      <div class="list">
        <div class="button-group">
          ${this.getOptionsA().map(
            (option) => html`
              <button
                class="button ${this.selectedA === option
                  ? "button--primary"
                  : ""}"
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
              </button>
            `
          )}
        </div>

        <div class="swap-icon">
          <llcuv-swap-icon></llcuv-swap-icon>
        </div>

        <div class="button-group">
          ${this.getOptionsB().map(
            (option) => html`
              <button
                class="button ${this.selectedB === option
                  ? "button--primary"
                  : ""}"
                @click="${() => this.toggleSelectB(option)}"
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
              </button>
            `
          )}
        </div>
      </div>

      ${this.selectedA && this.selectedB
        ? html`
            <div class="bottom">
              <button
                class="button button--primary"
                @click="${() => this.onConfirm()}"
              >
                Confirm
              </button>
              <button
                style="margin-top: 0.5rem;"
                class="button"
                @click="${() => this.onCancel()}"
              >
                Cancel
              </button>
            </div>
          `
        : ""}
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

  private onCancel() {
    this.dispatchEvent(new CustomEvent("cancel"));
  }

  private getOptionsA(): CalendarEvent[] {
    if (this.selectedA) {
      return [this.selectedA];
    }

    return this.calendarEvents.filter((option) => option !== this.selectedB);
  }

  private getOptionsB(): CalendarEvent[] {
    if (this.selectedB) {
      return [this.selectedB];
    }

    return this.calendarEvents.filter((option) => option !== this.selectedA);
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
    "llcuv-admin-swap-pianists": UtahAdminSwapPianistsElement;
  }
}
