import { LitElement } from "lit";
import "./element/calendar/calendar-element";
import "./element/calendar/calendar-header-element";
import "./element/calendar/calendar-mobile-element";
import { EventScheduler } from "./event-scheduler/event-scheduler";
import { CalendarEvent } from "./model/calendar-event.model";
export declare class UtahAppElement extends LitElement {
    static styles: import("lit").CSSResult;
    isMobile: boolean;
    eventScheduler: EventScheduler;
    calendarEvents: CalendarEvent[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "utah-app": UtahAppElement;
    }
}
