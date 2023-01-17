import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../icon/logo-element";
import "../icon/menu-close-icon-element";
import "../icon/menu-icon-element";

@customElement("llcuv-page-layout")
export class PageLayoutElement extends LitElement {
  static styles = css`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--primary-700);
    }

    .menu-overlay {
      background: var(--gray-900);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu-toggle {
      background: transparent;
      border: none;
      cursor: pointer;
      display: none;
    }

    .menu-close {
      position: absolute;
      top: 2rem;
      right: 1rem;
      color: white;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      font-size: 1.875rem;
      transform: translateY(-40%);
    }

    li {
      cursor: pointer;
      color: var(--gray-200);
    }

    li:hover {
      color: white;
    }

    .logo {
      text-transform: uppercase;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .logo-primary {
      color: var(--primary-700);
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 0.25rem;
    }

    .logo-secondary {
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    *[role="menu"] {
      display: flex;
    }

    *[role="menu-item"] {
      padding: 1rem;
      color: var(--primary-700);
      cursor: pointer;
    }

    *[role="menu-item"].active {
      font-weight: bold;
      color: var(--primary-800);
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }
      .menu-desktop {
        display: none;
      }
    }
  `;

  @state()
  isMenuOpen = false;

  @property()
  activeRoute: string | null = null;

  menuItems = [
    {
      name: "Schedule",
      route: "/schedule",
    },
    {
      name: "Donate",
      route: "/donate",
    },
    {
      name: "Admin",
      route: "/admin",
    },
  ];

  render() {
    if (this.isMenuOpen) {
      return html`<div class="menu-overlay">
        <button
          class="menu-toggle menu-close"
          @click="${() => this.toggleMenu()}"
        >
          <llcuv-menu-close-icon></llcuv-menu-close-icon>
        </button>
        <ul role="”menu”">
          ${this.menuItems.map(
            (item) => html`
              <li
                role="”menuitem”"
                @click="${() => this.onMenuItemSelect(item.route)}"
              >
                ${item.name}
              </li>
            `
          )}
        </ul>
      </div>`;
    }

    return html`<div class="header">
        <div class="logo">
          <llcuv-logo></llcuv-logo>
          <div>
            <div class="logo-secondary">Laestadian Lutheran Church</div>
            <div class="logo-primary">Utah Valley</div>
          </div>
        </div>
        <button class="menu-toggle" @click="${() => this.toggleMenu()}">
          <llcuv-menu-icon></llcuv-menu-icon>
        </button>
        <div class="menu-desktop" role="menu">
          ${this.menuItems.map((item) => {
            return html`
              <div
                role="menu-item"
                class="${this.isRouteActivated(item.route) ? "active" : ""}"
                @click="${() => this.onMenuItemSelect(item.route)}"
              >
                ${item.name}
              </div>
            `;
          })}
        </div>
      </div>
      <slot></slot>`;
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private onMenuItemSelect(route: string) {
    this.isMenuOpen = false;

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("menu-item-select", {
          detail: {
            route,
          },
        })
      );
    }, 1);
  }

  private isRouteActivated(route: string) {
    return route === this.activeRoute;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-page-layout": PageLayoutElement;
  }
}
