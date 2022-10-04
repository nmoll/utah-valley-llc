import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-contact-page")
export class ContactPageElement extends LitElement {
  render() {
    return html` Contact `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-contact-page": ContactPageElement;
  }
}
