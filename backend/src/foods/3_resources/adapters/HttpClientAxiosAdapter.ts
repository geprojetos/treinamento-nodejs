import axios, { AxiosInstance } from "axios"

interface IHttpClient {
  get?(): Promise<any>
  post?(input: any): Promise<any>
  delete?(input: any): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  private _baseUrl

  static instance: HttpClientAxiosAdapter
  private _axios: AxiosInstance

  private constructor() {
    this._baseUrl = "http://localhost:3000/foods-v2"
    this._axios = axios.create({ baseURL: this._baseUrl })
    this._interceptor()
  }

  async get(): Promise<any> {
    const response = await this._axios.get(this._baseUrl)
    return response.data
  }

  async post(input: any): Promise<any> {
    const response = await this._axios.post(this._baseUrl, input)
    return response.data
  }

  async delete(input: any): Promise<any> {
    try {
      const response = await this._axios.delete(`${this._baseUrl}/${input.id}`)
      return {
        status: response.status,
        message: response.statusText,
      }
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        description: error.message,
      }
    }
  }

  private _interceptor = () => {
    this._axios.interceptors.request.use((request) => {
      const logs = {
        baseUrl: request.baseURL,
        headers: request.headers,
        method: request.method,
        params: request.params,
      }
      console.log("request", JSON.stringify(logs))
      return request
    })

    this._axios.interceptors.response.use((response) => {
      const logs = {
        baseURL: response.config.baseURL,
        data: response.data,
      }
      console.log("response", JSON.stringify(logs))
      return response
    })
  }

  public static getInstance(): HttpClientAxiosAdapter {
    if (!HttpClientAxiosAdapter.instance) {
      HttpClientAxiosAdapter.instance = new HttpClientAxiosAdapter()
    }
    return HttpClientAxiosAdapter.instance
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
