import axios from "axios"
import IHttpClient from "./IHttpClient"

export default class HttpClientAxiosAdapter implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get(url)
    return response.data
  }
}
