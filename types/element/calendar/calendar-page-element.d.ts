import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import { AdminService } from "../../service/admin.service";
import "./calendar-element";
import "./calendar-header-element";
import "./calendar-mobile-element";
export declare class UtahCalendarPageElement extends LitElement {
    static styles: import("lit").CSSResult;
    isMobile: boolean;
    calendarEvents: CalendarEvent[];
    adminService: AdminService;
    constructor();
    render(): "" | import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-calendar-page": UtahCalendarPageElement;
    }
}
