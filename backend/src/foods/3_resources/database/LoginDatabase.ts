import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"
import { ILogger } from "../adapters/LoggerPinoAdapter"

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
  get(path: string): Promise<ILoginResponse>
  post(input: ILogin, path: string): Promise<IRegisterResponse>
}

class LoginDatabase implements ILoginDatabase {
  constructor(private _httpClient: IHttpClient, private _logger: ILogger) {}

  async post(input: ILogin, path: string): Promise<IRegisterResponse> {
    try {
      this._logger.info(`LoginDatabase - Create user ${input}`)
      const response: IRegisterResponse = await this._httpClient.post(
        input,
        path
      )
      return {
        status: String(response.status),
        message: response.message,
        data: response.data,
      }
    } catch (error) {
      this._logger.info(`LoginDatabase - Error create user ${error.message}`)
    }
  }

  async get(path: string): Promise<ILoginResponse> {
    const response: ILoginResponse = await this._httpClient.get(path)

    return {
      status: String(response.status),
      message: response.message,
      data: response.data,
    }
  }
}

export default LoginDatabase
export type { ILoginResponse, ILoginDatabase, ILogin, IRegisterResponse }
