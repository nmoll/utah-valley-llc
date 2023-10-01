import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { EventScheduler } from "../../event-scheduler/event-scheduler";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";
import "../icon/success-animation-icon-element";
import "../icon/swap-icon-element";
import { buttonStyles } from "../styles/button-styles";
import "./admin-swap-bible-class-element";
import "./admin-swap-hosts-element";
import "./admin-swap-pianists-element";

type Page =
  | "Swap Hosts"
  | "Swap Pianists"
  | "Swap Bible Class"
  | "Success Confirmation";

interface ConfirmEvent {
  detail: {
    updates: ScheduleUpdate[];
  };
}

@customElement("llcuv-admin-pagex")
export class UtahAdminPageElement extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
      }

      p {
        text-align: center;
        color: var(--primary-500);
        font-size: 2rem;
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .updated-message {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: var(--primary-500);
        color: white;
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        display-items: center;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  @state()
  page: Page | null = null;

  @state()
  updates: ScheduleUpdate[] | null = null;

  @state()
  calendarEvents: CalendarEvent[] = [];

  constructor() {
    super();

    const adminService = new AdminService(new HttpService());

    Promise.all([
      adminService.getHosts(),
      adminService.getPianists(),
      adminService.getBibleClassLeaders(),
      adminService.getServiceDirectors(),
      adminService.getScheduleUpdates(),
    ]).then(
      ([
        hosts,
        pianists,
        bibleClassLeaders,
        serviceDirectors,
        scheduleUpdates,
      ]) => {
        const scheduler = new EventScheduler({
          hosts,
          pianists,
          bibleClassLeaders,
          serviceDirectors,
          scheduleUpdates,
        });

        this.calendarEvents = scheduler.scheduleAll(
          dayjs(),
          dayjs().add(35, "days")
        );
      }
    );
  }

  render() {
    if (this.page) {
      return this.renderPage(this.page);
    }

    return html`
      <p>I want to...</p>
      <div class="list">
        <div class="button-group">
          <button
            class="button"
            @click="${() => this.selectPage("Swap Hosts")}"
          >
            Swap hosts
          </button>
          <button
            class="button"
            @click="${() => this.selectPage("Swap Pianists")}"
          >
            Swap pianists
          </button>
          <button
            class="button"
            @click="${() => this.selectPage("Swap Bible Class")}"
          >
            Swap bible class
          </button>
        </div>

        <div class="button-group">
          <button class="button">Add new service</button>
          <button class="button">Cancel service</button>
        </div>

        <div class="button-group">
          <button class="button">Add me to rotation</button>
          <button class="button">Remove me temporarily</button>
          <button class="button">Remove me permanently</button>
        </div>
      </div>
    `;
  }

  private renderPage(page: Page) {
    switch (page) {
      case "Swap Hosts":
        return html`<llcuv-admin-swap-hosts
          .calendarEvents="${this.calendarEvents}"
          @confirm="${this.onConfirm}"
          @cancel="${this.onCancel}"
        ></llcuv-admin-swap-hosts>`;
      case "Swap Pianists":
        return html`<llcuv-admin-swap-pianists
          .calendarEvents="${this.calendarEvents}"
          @confirm="${this.onConfirm}"
          @cancel="${this.onCancel}"
        ></llcuv-admin-swap-pianists>`;
      case "Swap Bible Class":
        return html`<llcuv-admin-swap-bible-class
          .calendarEvents="${this.calendarEvents}"
          @confirm="${this.onConfirm}"
          @cancel="${this.onCancel}"
        ></llcuv-admin-swap-bible-class>`;
      case "Success Confirmation":
        return html`<div class="updated-message">
          <llcuv-success-animation-icon></llcuv-success-animation-icon>
          Schedule updated!
        </div>`;
    }
  }

  private selectPage(page: Page) {
    this.page = page;
  }

  private onConfirm(event: ConfirmEvent) {
    this.updates = event.detail.updates;
    this.page = "Success Confirmation";

    setTimeout(() => {
      this.page = null;
    }, 2000);
  }

  private onCancel() {
    this.page = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-pagex": UtahAdminPageElement;
  }
}
