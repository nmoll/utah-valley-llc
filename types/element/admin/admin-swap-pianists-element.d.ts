import { LitElement } from "lit";
import { CalendarEvent } from "../../model/calendar-event.model";
export declare class UtahAdminSwapPianistsElement extends LitElement {
    static styles: import("lit").CSSResult[];
    calendarEvents: CalendarEvent[];
    selectedA: CalendarEvent | null;
    selectedB: CalendarEvent | null;
    render(): import("lit-html").TemplateResult<1>;
    private onConfirm;
    private onCancel;
    private getOptionsA;
    private getOptionsB;
    private toggleSelectA;
    private toggleSelectB;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-admin-swap-pianists": UtahAdminSwapPianistsElement;
    }
}
