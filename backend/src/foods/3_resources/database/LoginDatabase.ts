import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"

interface ILoginResponse {
  status: string
  message: string
  data: ILoginData
}

interface ILoginData {
  email: string
}

interface ILogin {
  email: string
  password: string
}

interface ILoginDatabase {
  create(input: ILogin): Promise<ILoginResponse>
}

class LoginDatabase implements ILoginDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async create(input: ILogin): Promise<ILoginResponse> {
    const response = await this._httpClient.post(input)
    return {
      status: String(response.status),
      message: response.message,
      data: response.data,
    }
  }
}

export default LoginDatabase
export type { ILoginResponse, ILoginDatabase, ILogin }
