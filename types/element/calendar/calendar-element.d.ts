import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import "./calendar-event-element";
export declare class UtahCalendarElement extends LitElement {
  static styles: import("lit").CSSResult;
  events: CalendarEvent[];
  render(): import("lit-html").TemplateResult<1>;
  private getWeeks;
}
declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar": UtahCalendarElement;
  }
}
