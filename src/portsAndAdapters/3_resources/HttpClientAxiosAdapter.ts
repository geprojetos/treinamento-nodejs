import axios from "axios"

interface IHttpClient {
  get(url: string): Promise<any>
}

class HttpClientAxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
