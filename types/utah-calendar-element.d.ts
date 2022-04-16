import { LitElement } from "lit";
import "./bible-class-leader-icon-element";
import "./pianist-icon-element";
import "./service-host-icon-element";
export declare class UtahCalendarElement extends LitElement {
  static styles: import("lit").CSSResult;
  days: number[];
  render(): import("lit-html").TemplateResult<1>;
  private buildDays;
}
declare global {
  interface HTMLElementTagNameMap {
    "llcuv-calendar": UtahCalendarElement;
  }
}
