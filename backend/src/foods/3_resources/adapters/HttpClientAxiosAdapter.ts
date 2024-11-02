import axios, { AxiosInstance } from "axios"
import LoggerPinoAdapter, { ILogger } from "./LoggerPinoAdapter"

interface IHttpClient {
  get?(): Promise<any>
  post?(input: any): Promise<any>
  delete?(input: any): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  private _baseUrl
  private _axios: AxiosInstance
  static instance: HttpClientAxiosAdapter

  private constructor(private _logger: ILogger) {
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
    return response
  }

  async delete(input: any): Promise<any> {
    const response = await this._axios.delete(`${this._baseUrl}/${input.id}`)
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
          data: response.data,
        }
        this._logger.info({ Response: logs })
        return response
      },
      (error) => {
        this._logger.error(error.message)
      }
    )
  }

  public static getInstance(): HttpClientAxiosAdapter {
    if (!HttpClientAxiosAdapter.instance) {
      HttpClientAxiosAdapter.instance = new HttpClientAxiosAdapter(
        new LoggerPinoAdapter()
      )
    }
    return HttpClientAxiosAdapter.instance
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
