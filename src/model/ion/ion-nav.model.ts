export interface IonNav extends HTMLElement {
  push(component: string): void;

  setRoot(component: string, props: Record<string, unknown>): void;
}
