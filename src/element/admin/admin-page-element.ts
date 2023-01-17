import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./admin-bible-class-element";

@customElement("llcuv-admin-page")
export class UtahAdminPageElement extends LitElement {
  @state()
  error = "";

  @state()
  isLoggedIn = localStorage.getItem("llcuv-admin") === "true";

  render() {
    if (this.isLoggedIn) {
      return html`<llcuv-admin-bible-class></llcuv-admin-bible-class>`;
    }

    return html`
      <div class="container">
        <p>Admin Login</p>

        <div class="form">
          <input placeholder="Password..." type="password" />
          <button @click="${() => this.submit()}">Submit</button>
          <span class="error">${this.error}</span>
        </div>
      </div>
    `;
  }

  submit() {
    const password = this.shadowRoot?.querySelector("input")?.value;
    if (password === "llcuv") {
      this.dispatchEvent(new CustomEvent("admin-authorized"));
      this.error = "";
      localStorage.setItem("llcuv-admin", "true");
      this.isLoggedIn = true;
    } else {
      this.error = "Incorrect password";
    }
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-width: 450px;
      margin: 0 auto;
      padding: 1rem;
      margin-top: 2rem;
    }

    input {
      height: 2rem;
      padding: 0.5rem;
      border: 1px solid var(--primary-500);
      border-radius: 0.25rem;
    }

    button {
      width: 100%;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: 1px solid var(--primary-500);
      border-radius: 0.25rem;
      background-color: var(--primary-500);
      color: white;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    p {
      font-size: 1.5rem;
      color: var(--primary-700);
    }

    .error {
      color: red;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-admin-page": UtahAdminPageElement;
  }
}
