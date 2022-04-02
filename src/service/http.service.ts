export class HttpService {
  get<T>(url: string): Promise<T> {
    return fetch(url).then((resp) => resp.json());
  }

  post<T>(url: string, data: T): Promise<T> {
    return fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
  }

  put<T>(url: string, data: T): Promise<T> {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
  }
}
