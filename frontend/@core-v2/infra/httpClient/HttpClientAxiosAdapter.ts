import axios from "axios"

interface IHttpClient {
  get(): Promise<any>
  post(input: any): Promise<any>
  patch(input: any): Promise<any>
  delete(input: any): Promise<any>
}

export default class HttpClientAxiosAdapter implements IHttpClient {
  static instance: HttpClientAxiosAdapter

  private constructor(private _baseUrl: string) {}

  static getInstance(baseUrl: string) {
    if (!HttpClientAxiosAdapter.instance) {
      HttpClientAxiosAdapter.instance = new HttpClientAxiosAdapter(baseUrl)
    }
    return HttpClientAxiosAdapter.instance
  }

  async get(): Promise<any> {
    try {
      const response = await axios.get(this._baseUrl)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      console.error("Error GET HttpClientAxiosAdapter", error.message)
    }
  }

  async post(input: any): Promise<any> {
    try {
      const response = await axios.post(this._baseUrl, input)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      console.error("Error POST HttpClientAxiosAdapter", error.message)
    }
  }

  async patch(input: any): Promise<any> {
    try {
      const response = await axios.patch(`${this._baseUrl}/${input.id}`, input)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      console.error("Error PATCH HttpClientAxiosAdapter", error.message)
    }
  }

  async delete(input: any): Promise<any> {
    try {
      const response = await axios.delete(`${this._baseUrl}/${input}`)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error: any) {
      console.error("Error DELETE HttpClientAxiosAdapter", error.message)
    }
  }
}

export type { IHttpClient }
