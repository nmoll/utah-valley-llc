import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import "../icon/bible-class-leader-icon-element";
import "../icon/pianist-icon-element";
import "../icon/service-host-icon-element";
export declare class UtahCalendarEventElement extends LitElement {
    static styles: import("lit").CSSResult;
    event: CalendarEvent;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "utah-calendar-event": UtahCalendarEventElement;
    }
}
