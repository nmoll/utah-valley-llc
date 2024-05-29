import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CalendarEvent } from "../../model/calendar-event.model";
import { WindowUtil } from "../../util/window.util";
import "./calendar-element";
import "./calendar-header-element";
import "./calendar-mobile-element";
import { CalendarStore } from "./calendar-store";
import {
  BibleClassLeaderState,
  BibleClassLeaderStore,
} from "./bible-class-leader-store";

@customElement("llcuv-calendar-page")
export class UtahCalendarPageElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  @state()
  isMobile = WindowUtil.isMobile();

  @state()
  calendarEvents: CalendarEvent[] = [];

  @state()
  bibleClassLeaderState: BibleClassLeaderState = {
    type: "initial",
  };

  constructor() {
    super();

    WindowUtil.resize(() => {
      this.isMobile = WindowUtil.isMobile();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    CalendarStore.getInstance()
      .reload()
      .then((calendarEvents) => {
        this.calendarEvents = calendarEvents;
      });

    this.loadBibleClassLeaders();
  }

  private async loadBibleClassLeaders() {
    if (this.bibleClassLeaderState.type !== "initial") {
      return;
    }

    this.bibleClassLeaderState = {
      type: "loading",
    };

    const bibleClassLeaderStore = new BibleClassLeaderStore();
    const bibleClassLeaders =
      await bibleClassLeaderStore.getBibleClassLeaders();
    this.bibleClassLeaderState = {
      type: "loaded",
      bibleClassLeaders,
    };
  }

  render() {
    if (!this.calendarEvents.length) {
      return "";
    }

    const bibleClassLeaders =
      this.bibleClassLeaderState.type === "loaded"
        ? this.bibleClassLeaderState.bibleClassLeaders
        : {};

    return this.isMobile
      ? html`<llcuv-calendar-mobile
          .events="${this.calendarEvents}"
          .bibleClassLeaders="${bibleClassLeaders}"
        ></llcuv-calendar-mobile>`
      : html`<llcuv-calendar
          .events="${this.calendarEvents}"
          .bibleClassLeaders="${bibleClassLeaders}"
        ></llcuv-calendar>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar-page": UtahCalendarPageElement;
  }
}
