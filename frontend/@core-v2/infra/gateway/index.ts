import axios from "axios"
import { IHttpClient } from "../httpClient/HttpClientAxiosAdapter"

interface IGateway {
  getAll(): Promise<any>
  create(input: any): Promise<any>
  patch(input: any): Promise<any>
  delete(input: any): Promise<any>
}

export default class Gateway implements IGateway {
  constructor(private _httpClient: IHttpClient) {}

  async delete(input: any): Promise<any> {
    try {
      const response = await this._httpClient.delete(input)
      return response
    } catch (error: any) {
      console.error("Error DELETE Gateway", error.message)
    }
  }

  async patch(input: any): Promise<any> {
    try {
      const response = await this._httpClient.patch(input)
      return response
    } catch (error: any) {
      console.error("Error PATCH Gateway", error.message)
    }
  }

  async create(input: any): Promise<any> {
    try {
      const response = await this._httpClient.post(input)
      return response
    } catch (error: any) {
      console.error("Error CREATE Gateway", error.message)
    }
  }

  async getAll(): Promise<any> {
    try {
      const response = await this._httpClient.get()
      return response
    } catch (error: any) {
      console.error("Error GETALL Gateway", error.message)
    }
  }
}

export type { IGateway }
