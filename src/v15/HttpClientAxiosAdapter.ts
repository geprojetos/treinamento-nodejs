import axios from "axios"
import IHttpClient from "./IHttpClient"
import IUserDTO from "./IUserDTO"

export default class HttpClientAxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get<IUserDTO[]>(url)
    return response.data
  }

  async create(url: string, data: any): Promise<any> {
    const response = await axios.post(url, data)
    return response.data
  }
}
