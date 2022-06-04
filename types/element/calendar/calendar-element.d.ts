import dayjs from "dayjs";
import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import "../icon/chevron-left-icon-element";
import "../icon/chevron-right-icon-element";
import "./calendar-event-element";
export declare class UtahCalendarElement extends LitElement {
    static styles: import("lit").CSSResult;
    events: CalendarEvent[];
    month: dayjs.Dayjs;
    render(): import("lit-html").TemplateResult<1>;
    private getWeeks;
    private next;
    private previous;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-calendar": UtahCalendarElement;
    }
}
