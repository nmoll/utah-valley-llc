import { LitElement } from "lit";
import "./element/admin/admin-page-element";
import "./element/calendar/calendar-page-element";
export declare class UtahAppElement extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "llcuv-app": UtahAppElement;
    }
}
