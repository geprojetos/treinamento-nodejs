import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"

export interface IDatabase {
  getFoods(): Promise<any>
  createFood(input: any): Promise<any>
}

class FoodsDatabase implements IDatabase {
  private _baseUrl

  constructor(private _httpClient: IHttpClient) {
    this._baseUrl = "http://localhost:3000/foods-v2"
  }

  async createFood(input: any): Promise<any> {
    const response = await this._httpClient.post(this._baseUrl, input)
    return response
  }

  async getFoods() {
    const response = await this._httpClient.get(this._baseUrl)
    return response
  }
}

export default FoodsDatabase
