import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-suggestion-box-page")
export class SuggestionBoxPageElement extends LitElement {
  render() {
    return html`
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdPSk3hLZJWiGuX0xcogSfXr0CyEytQyAzk7zH5WCjQuAFT7w/viewform?embedded=true"
        width="100%"
        height="750"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >Loading…</iframe
      >
    `;
  }

  static styles = css`
    iframe {
      margin-top: 2rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-suggestion-box-page": SuggestionBoxPageElement;
  }
}
