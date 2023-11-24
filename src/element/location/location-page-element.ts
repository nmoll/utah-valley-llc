import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-location-page")
export class LocationPageElement extends LitElement {
  render() {
    return html` Location `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-contact-page": LocationPageElement;
  }
}
