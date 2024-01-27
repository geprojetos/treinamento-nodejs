import axios from "axios"
import HttpClientV3 from "./IHttpClient"

export default class HttpClientAdapterV3 implements HttpClientV3 {
  constructor(private baseUrl: string) {}

  async get(): Promise<any> {
    const output = await axios.get(this.baseUrl)
    return output
  }
}
