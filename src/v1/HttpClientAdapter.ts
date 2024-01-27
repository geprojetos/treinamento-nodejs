import IHttpClient from "./HttpClient"
import axios, { AxiosResponse, AxiosStatic } from "axios"

class HttpClientAdapter implements IHttpClient {
  private _axios: AxiosStatic

  constructor() {
    this._axios = axios
  }

  async get(url: string): Promise<AxiosResponse<any, any>> {
    return await this._axios.get(url)
  }
}

export default HttpClientAdapter
