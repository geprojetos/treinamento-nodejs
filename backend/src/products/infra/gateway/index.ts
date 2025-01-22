import { IHttpClient } from "../httpClient/HttpClientAxiosAdapter"

interface IProducts {
  id?: string
  name: string
  description: string
  price: number
  category: string
}

interface IGateway {
  create(input: any): Promise<{
    status: number
    data: any
  }>
  get(): Promise<{
    status: number
    data: any
  }>
  patch(input: any): Promise<{
    status: number
    data: any
  }>
  delete(id: string): Promise<{
    status: number
  }>
}

class GatewayProduct implements IGateway {
  constructor(private _httpClient: IHttpClient) {}

  async get() {
    try {
      const { data } = await this._httpClient.get()
      const output = {
        status: 200,
        data,
      }
      return output
    } catch (error) {
      console.log("Get resources product error", error.message)
    }
  }

  async create(input: any) {
    try {
      const { data } = await this._httpClient.post(input)
      const output = {
        status: 201,
        data,
      }
      return output
    } catch (error) {
      console.log("Resource create product error", error.message)
    }
  }

  async patch(input: any) {
    try {
      const { data } = await this._httpClient.patch(input)
      const output = {
        status: 201,
        data,
      }
      return output
    } catch (error) {
      console.log("Edit resources product error", error.message)
    }
  }

  async delete(id: string) {
    try {
      await this._httpClient.delete(id)
      const output = {
        status: 200,
      }
      return output
    } catch (error) {
      console.log("Delete product error", error.message)
    }
  }
}

export default GatewayProduct
export type { IGateway, IProducts }
