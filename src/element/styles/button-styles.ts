import { css } from "lit";

export const buttonStyles = css`
  .button {
    width: 100%;
    color: var(--gray-600);
    border: 1px solid var(--gray-600);
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    font-size: 1.25rem;
  }

  .button--primary {
    background-color: var(--primary-500);
    border-color: var(--primary-500);
    color: white;
  }

  .button-group {
    display: flex;
    flex-direction: column;
  }

  .button-group .button:not(:first-child, :last-child) {
    border-radius: 0;
    border-bottom: 0;
  }

  .button-group .button:first-child:not(:last-child) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }

  .button-group .button:last-child:not(:first-child) {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;
