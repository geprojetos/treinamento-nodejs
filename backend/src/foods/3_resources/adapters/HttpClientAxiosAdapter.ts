import axios, { AxiosInstance } from "axios"
import LoggerPinoAdapter, { ILogger } from "./LoggerPinoAdapter"

interface IHttpClient {
  get?(path: string): Promise<any>
  post?(input: any, path: string): Promise<any>
  delete?(input: any, path: string): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  private _baseUrl
  private _axios: AxiosInstance
  static instance: HttpClientAxiosAdapter

  private constructor(private _logger: ILogger, private _url: string) {
    this._baseUrl = this._url
    this._axios = axios.create({ baseURL: this._baseUrl })
    this._interceptor()
  }

  async get(path: string): Promise<any> {
    const response = await this._axios.get(`${this._baseUrl}${path}`)
    return response
  }

  async post(input: any, path: string): Promise<any> {
    const response = await this._axios.post(`${this._baseUrl}${path}`, input)
    return response
  }

  async delete(input: any, path: string): Promise<any> {
    const response = await this._axios.delete(
      `${this._baseUrl}${path}/${input.id}`
    )
    return response
  }

  private _interceptor = () => {
    this._axios.interceptors.request.use(
      (request) => {
        const logs = {
          baseUrl: request.baseURL,
          headers: request.headers,
          method: request.method,
          params: request.params,
          body: request.data,
        }
        this._logger.info({ Request: logs })
        return request
      },
      (error) => {
        this._logger.error(error.message)
      }
    )

    this._axios.interceptors.response.use(
      (response) => {
        const logs = {
          urlService: response.config.baseURL,
        }
        this._logger.info({ Response: logs })
        return response
      },
      (error) => {
        this._logger.error(error.message)
      }
    )
  }

  public static getInstance(url: string): HttpClientAxiosAdapter {
    if (!HttpClientAxiosAdapter.instance) {
      HttpClientAxiosAdapter.instance = new HttpClientAxiosAdapter(
        new LoggerPinoAdapter(),
        url
      )
    }
    return HttpClientAxiosAdapter.instance
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
