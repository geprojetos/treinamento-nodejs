import IHttpClientV4 from "./IHttpCLient"
import axios from "axios"

export default class HttpClientAxiosAdapterV4 implements IHttpClientV4 {
  constructor(private _baseUrl: string) {}

  async get(): Promise<any> {
    const output = await axios.get(this._baseUrl)
    return output.data
  }
}
