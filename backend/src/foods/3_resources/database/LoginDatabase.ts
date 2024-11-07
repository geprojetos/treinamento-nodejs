import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"
import LoggerPinoAdapter from "../adapters/LoggerPinoAdapter"

interface ILoginResponse {
  status: string
  message: string
  token?: string
  data?: ILoginData[]
}

interface IRegisterResponse {
  status: string
  message: string
  data?: ILoginData
}

interface ILoginData {
  email: string
  password?: string
}

interface ILogin {
  email: string
  password: string
}

interface ILoginDatabase {
  get(): Promise<ILoginResponse>
  post(input: ILogin): Promise<IRegisterResponse>
}

class LoginDatabase implements ILoginDatabase {
  private _loggerPinoAdapter: LoggerPinoAdapter

  constructor(private _httpClient: IHttpClient) {
    this._loggerPinoAdapter = new LoggerPinoAdapter()
  }

  async post(input: ILogin): Promise<IRegisterResponse> {
    try {
      this._loggerPinoAdapter.info(`LoginDatabase - Create user ${input}`)
      const response: IRegisterResponse = await this._httpClient.post(input)
      return {
        status: String(response.status),
        message: response.message,
        data: response.data,
      }
    } catch (error) {
      this._loggerPinoAdapter.info(
        `LoginDatabase - Error create user ${error.message}`
      )
    }
  }

  async get(): Promise<ILoginResponse> {
    const response: ILoginResponse = await this._httpClient.get()

    return {
      status: String(response.status),
      message: response.message,
      data: response.data,
    }
  }
}

export default LoginDatabase
export type { ILoginResponse, ILoginDatabase, ILogin, IRegisterResponse }
