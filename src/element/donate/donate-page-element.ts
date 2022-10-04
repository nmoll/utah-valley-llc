import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("llcuv-donate-page")
export class DonatePageElement extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 1rem;m
    }

    .tithely-give-btn {
      background-color: white;
      font-size: 1.25rem;
      padding: 15px 70px;
      border-radius: 4px;
      cursor: pointer;
      background: rgb(93, 213, 164);
      color: white;
      border: 1px solid rgb(93, 213, 164);
      text-decoration: none;
    }

    img {
      width: 100%;
    }

    a {
      max-width: 700px;
      display: block;
      text-direction: none;
      text-align: center;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .tithely-give-btn {
        width: 100%;
      }
    }
    
  `;

  render() {
    return html`
      <div class="container">
        <a href="https://tithe.ly/give?c=5846465" class="img-container">
          <img
            class="thumb-image loaded"
            target="_blank"
            data-src="https://images.squarespace-cdn.com/content/v1/5c0730927e3c3a98c3f9af5b/1562185270866-TWX2QBY2H2TPUACHXQ65/tithely.jpg"
            data-image="https://images.squarespace-cdn.com/content/v1/5c0730927e3c3a98c3f9af5b/1562185270866-TWX2QBY2H2TPUACHXQ65/tithely.jpg"
            data-image-dimensions="2400x1200"
            data-image-focal-point="0.5,0.5"
            data-load="false"
            data-image-id="5d1d0e369e12e0000103e227"
            data-type="image"
            alt="tithely.jpg"
            data-image-resolution="2500w"
            src="https://images.squarespace-cdn.com/content/v1/5c0730927e3c3a98c3f9af5b/1562185270866-TWX2QBY2H2TPUACHXQ65/tithely.jpg?format=2500w"
          />
        </a>

        <a
          href="https://tithe.ly/give?c=5846465"
          class="tithely-give-btn"
          target="_blank"
        >
          Donate with Tithely
        </a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "llcuv-donate-page": DonatePageElement;
  }
}
