import IHttpClientV6 from "./IHttpClient"
import axios from "axios"

export default class HttpClientAxiosAdapterV6 implements IHttpClientV6 {
  constructor(private _baseUrl: string) {}

  async get(): Promise<any> {
    const output = await axios.get(this._baseUrl)
    return output.data
  }
}
