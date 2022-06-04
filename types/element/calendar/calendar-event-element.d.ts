import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import "../icon/bible-class-leader-icon-element";
import "../icon/location-icon-element";
import "../icon/pianist-icon-element";
import "../icon/service-host-icon-element";
export declare class UtahCalendarEventElement extends LitElement {
    static styles: import("lit").CSSResult;
    event: CalendarEvent;
    render(): import("lit-html").TemplateResult<1>;
    private renderLocation;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-calendar-event": UtahCalendarEventElement;
    }
}
