export interface Success<T> {
  type: "success";
  data: T;
}

export interface Error {
  type: "error";
}

export type AsyncResult<T> = Success<T> | Error;
