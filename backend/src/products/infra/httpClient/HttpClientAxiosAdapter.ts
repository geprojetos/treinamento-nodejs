import axios from "axios"

interface IHttpClient {
  post(data: any): Promise<any>
  get(): Promise<any>
  patch(data: any): Promise<any>
  delete(id: string): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  private _axios
  static instance: HttpClientAxiosAdapter

  private constructor(private _baseUrl: string, private _url: string) {
    this._baseUrl = this._baseUrl
    this._url = this._url
    this._axios = axios.create({
      baseURL: this._baseUrl,
      url: this._url,
    })
    this._interceptor()
  }

  private _interceptor() {
    this._axios.interceptors.request.use(
      (request) => {
        const logs = {
          time: new Date().toISOString(),
          baseUrl: request.baseURL,
          url: request.url,
          headers: request.headers,
          method: request.method,
          params: request.params,
          body: request.data,
        }
        if (process.env.NODE_ENV && process.env.NODE_ENV.valueOf() !== "test") {
          console.info({ request: JSON.parse(JSON.stringify(logs)) })
        }
        return request
      },
      (error) => {
        if (process.env.NODE_ENV && process.env.NODE_ENV.valueOf() !== "test") {
          console.error(error.message)
        }
      }
    )
    this._axios.interceptors.response.use(
      (response) => {
        const logs = {
          time: new Date().toISOString(),
          status: response.status,
          baseUrl: response.config.baseURL,
          url: response.config.url,
          method: response.config.method,
          data: JSON.stringify(response.data),
        }
        if (process.env.NODE_ENV && process.env.NODE_ENV.valueOf() !== "test") {
          console.info({ response: logs })
        }
        return response
      },
      (error) => {
        if (process.env.NODE_ENV && process.env.NODE_ENV.valueOf() !== "test") {
          console.error(error.message)
        }
      }
    )
  }

  static getInstance(baseUrl: string, url: string) {
    if (!HttpClientAxiosAdapter.instance) {
      HttpClientAxiosAdapter.instance = new HttpClientAxiosAdapter(baseUrl, url)
    }
    return HttpClientAxiosAdapter.instance
  }

  async post(data: any): Promise<any> {
    const response = await this._axios.post(this._url, data)
    return response
  }

  async get(): Promise<any> {
    try {
      const response = await this._axios.get(this._url)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async patch(data: any): Promise<any> {
    const fullUrl = `${this._url}/${data.id}`
    const response = await this._axios.patch(fullUrl, data)
    return response
  }

  async delete(id: string): Promise<any> {
    const fullUrl = `${this._url}/${id}`
    const response = await this._axios.delete(fullUrl)
    return response
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
