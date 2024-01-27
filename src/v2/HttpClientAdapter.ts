import { IHttpClientV2 } from "./HttpClient"
import axios from "axios"

export default class HttpClientAxiosAdapterV2 implements IHttpClientV2 {
  constructor(readonly baseUrl: string) {}

  async get(): Promise<any> {
    return axios.get(this.baseUrl)
  }
}
