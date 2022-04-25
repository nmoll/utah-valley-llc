interface HttpError {
  error: string;
}

export class HttpService {
  get<T>(url: string): Promise<T> {
    return fetch(url).then((resp) => resp.json());
  }

  async post<T>(url: string, data: T): Promise<T | HttpError> {
    const resp = await fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      return {
        error: "Http Post Error",
      };
    }

    return resp.json();
  }

  async put<T>(url: string, data: T): Promise<T | HttpError> {
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      return {
        error: "Http Put Error",
      };
    }

    return resp.json();
  }
}
