import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { buttonStyles } from "../styles/button-styles";

@customElement("llcuv-admin-button")
export class UtahAdminButtonElement extends LitElement {
  static styles = [buttonStyles];

  @property()
  active = false;

  render() {
    const classes = { active: this.active, button: true };
    return html`<button class=${classMap(classes)}><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-button": UtahAdminButtonElement;
  }
}
