import axios from "axios"

interface IHttpClient {
  get?(url: string): Promise<any>
  post?(url: string, input: any): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }

  async post(url: string, input: any): Promise<any> {
    const response = await axios.post(url, input)
    return response.data
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
