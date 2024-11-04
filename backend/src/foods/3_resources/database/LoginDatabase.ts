import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"

interface ILoginResponse {
  status: string
  message: string
  token?: string
  data?: ILoginData[]
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
}

class LoginDatabase implements ILoginDatabase {
  constructor(private _httpClient: IHttpClient) {}

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
export type { ILoginResponse, ILoginDatabase, ILogin }
