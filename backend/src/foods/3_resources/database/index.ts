import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"

export interface IDatabase {
  getFoods(): Promise<any>
}

class GetFoodsDatabase implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async getFoods() {
    const response = await this._httpClient.get(
      "http://localhost:3000/foods-v2"
    )
    return response
  }
}

export default GetFoodsDatabase
