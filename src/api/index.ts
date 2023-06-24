export class FetchClient {
  constructor() {}

  /* eslint-disable */

  private async request(url: string, options?: RequestInit): Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
    }

    const requestOptions: RequestInit = {
      headers,
      ...options
    }

    const response = await fetch(
      `${import.meta.env.BASE_URL}${url}`,
      requestOptions
    )
    const data = await response.json()

    if (response?.status === 400) {
      throw new Error(data.error || 'Request failed')
    }

    return data
  }

  post(url: string, data: unknown) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}
