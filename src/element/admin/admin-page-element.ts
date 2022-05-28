import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";
import { IonNav } from "../../model/ion/ion-nav.model";
import "./admin-nav-element";

@customElement("llcuv-admin-page")
export class UtahAdminPageElement extends LitElement {
  @query("ion-nav")
  nav: IonNav | undefined;

  selectPage() {
    if (this.nav) {
      this.nav.push("llcuv-admin-nav");
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      console.log(this.nav);
      this.nav?.setRoot("llcuv-admin-nav", {});
    }, 1);
  }

  render() {
    return html`<ion-nav></ion-nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-page": UtahAdminPageElement;
  }
}
