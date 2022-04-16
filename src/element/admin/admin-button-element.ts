import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("llcuv-admin-button")
export class UtahAdminButtonElement extends LitElement {
  static styles = css`
    button {
      width: 100%;
      color: var(--primary-500);
      border: 1px solid var(--primary-500);
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: white;
    }

    .active {
      background-color: var(--primary-500);
      color: white;
    }
  `;

  @property()
  active = false;

  render() {
    const classes = { active: this.active };
    return html`<button class=${classMap(classes)}><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-button": UtahAdminButtonElement;
  }
}
