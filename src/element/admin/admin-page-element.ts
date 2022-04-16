import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import "../icon/swap-icon-element";
import "./admin-button-element";
import "./admin-swap-pianists-element";

type Page = "Swap Pianists";

interface ConfirmEvent {
  detail: {
    updates: ScheduleUpdate[];
  };
}

@customElement("llcuv-admin-page")
export class UtahAdminPageElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      padding: 1rem;
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
      display-items: center;
      align-items: center;
      justify-content: center;
    }
  `;

  @state()
  page: Page | null = null;

  @state()
  updates: ScheduleUpdate[] | null = null;

  render() {
    if (this.updates?.length) {
      return html`<div
        @click="${() => (this.updates = null)}"
        class="updated-message"
      >
        Calendar updated!
      </div>`;
    }

    if (this.page === "Swap Pianists") {
      return html`<llcuv-admin-swap-pianists
        @confirm="${this.onConfirm}"
      ></llcuv-admin-swap-pianists>`;
    }

    return html`
      <p>What would you like to change?</p>
      <div class="list">
        <div class="group">
          <llcuv-admin-button>Swap hosts</llcuv-admin-button>
          <llcuv-admin-button @click="${() => (this.page = "Swap Pianists")}"
            >Swap pianists</llcuv-admin-button
          >
          <llcuv-admin-button>Swap bible class</llcuv-admin-button>
        </div>

        <div class="group">
          <llcuv-admin-button>Add new service</llcuv-admin-button>
          <llcuv-admin-button>Cancel service</llcuv-admin-button>
        </div>

        <div class="group">
          <llcuv-admin-button>Add me to rotation</llcuv-admin-button>
          <llcuv-admin-button>Remove me temporarily</llcuv-admin-button>
          <llcuv-admin-button>Remove me permanently</llcuv-admin-button>
        </div>
      </div>
    `;
  }

  onConfirm(event: ConfirmEvent) {
    this.updates = event.detail.updates;
    this.page = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-page": UtahAdminPageElement;
  }
}
