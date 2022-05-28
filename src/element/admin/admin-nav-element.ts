import dayjs from "dayjs";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { EventScheduler } from "../../event-scheduler/event-scheduler";
import { CalendarEvent } from "../../model/calendar-event.model";
import { IonNav } from "../../model/ion/ion-nav.model";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import { AdminService } from "../../service/admin.service";
import { HttpService } from "../../service/http.service";
import "../icon/error-icon-element";
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
  | "Success Confirmation"
  | "Save Error";

interface ConfirmEvent {
  detail: {
    updates: ScheduleUpdate[];
  };
}

@customElement("llcuv-admin-nav")
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

      .message-overlay {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        color: white;
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        display-items: center;
        align-items: center;
        justify-content: center;
      }

      .message-overlay--success {
        background-color: var(--primary-500);
      }

      .message-overlay--error {
        background-color: var(--red-500);
      }
    `,
  ];

  @state()
  page: Page | null = null;

  @property()
  calendarEvents: CalendarEvent[] = [];

  @property()
  nav!: IonNav;

  saving = false;

  adminService: AdminService;

  constructor() {
    super();

    console.log("nav", this.nav);

    this.adminService = new AdminService(new HttpService());

    Promise.all([
      this.adminService.getHosts(),
      this.adminService.getPianists(),
      this.adminService.getBibleClassLeaders(),
      this.adminService.getScheduleUpdates(),
    ]).then(([hosts, pianists, bibleClassLeaders, scheduleUpdates]) => {
      const scheduler = new EventScheduler({
        hosts,
        pianists,
        bibleClassLeaders,
        scheduleUpdates,
      });

      this.calendarEvents = scheduler.scheduleAll(
        dayjs(),
        dayjs().add(60, "days")
      );
    });
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
        return html`<div class="message-overlay message-overlay--success">
          <llcuv-success-animation-icon></llcuv-success-animation-icon>
          Schedule updated!
        </div>`;
      case "Save Error":
        return html`<div class="message-overlay message-overlay--error">
          <llcuv-error-icon></llcuv-error-icon>
          Failed to save
        </div>`;
    }
  }

  private selectPage(page: Page) {
    this.page = page;
  }

  private async onConfirm(event: ConfirmEvent) {
    if (this.saving) {
      return;
    }

    this.saving = true;

    const result = await this.adminService.saveScheduleUpdates(
      event.detail.updates
    );

    this.page = result.type === "error" ? "Save Error" : "Success Confirmation";
    this.saving = false;

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
    "llcuv-admin-nav": UtahAdminPageElement;
  }
}
