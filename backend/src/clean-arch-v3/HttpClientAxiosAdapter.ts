import axios from "axios"
import IHttpClient from "./IHttpClient"

export default class HttpClientAxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
}
