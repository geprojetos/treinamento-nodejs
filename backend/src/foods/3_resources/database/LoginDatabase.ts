import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"

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
  constructor(private _httpClient: IHttpClient) {}

  async post(input: ILogin): Promise<IRegisterResponse> {
    const response: IRegisterResponse = await this._httpClient.post(input)

    return {
      status: String(response.status),
      message: response.message,
      data: response.data,
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
