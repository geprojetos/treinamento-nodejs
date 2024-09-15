import axios from "axios"

interface IHttpClient {
  get?(url: string): Promise<any>
  post?(url: string, input: any): Promise<any>
  delete?(url: string, input: any): Promise<any>
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

  async delete(url: string, input: any): Promise<any> {
    try {
      const response = await axios.delete(`${url}/${input.id}`)
      return {
        status: response.status,
        message: response.statusText,
      }
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.statusText,
        description: error.message,
      }
    }
  }
}

export default HttpClientAxiosAdapter
export type { IHttpClient }
