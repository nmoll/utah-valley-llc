import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
import { ScheduleUpdate } from "../../model/schedule-update.model";
import "../icon/success-animation-icon-element";
import "../icon/swap-icon-element";
import "./admin-swap-bible-class-element";
import "./admin-swap-hosts-element";
import "./admin-swap-pianists-element";
declare type Page = "Swap Hosts" | "Swap Pianists" | "Swap Bible Class" | "Success Confirmation";
export declare class UtahAdminPageElement extends LitElement {
    static styles: import("lit").CSSResult[];
    page: Page | null;
    updates: ScheduleUpdate[] | null;
    calendarEvents: CalendarEvent[];
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private renderPage;
    private selectPage;
    private onConfirm;
    private onCancel;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-admin-page": UtahAdminPageElement;
    }
}
export {};
