import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import "./calendar-event-element";
export declare class UtahCalendarMobileElement extends LitElement {
    static styles: import("lit").CSSResult;
    events: CalendarEvent[];
    render(): Generator<unknown, void, unknown>;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-calendar-mobile": UtahCalendarMobileElement;
    }
}
