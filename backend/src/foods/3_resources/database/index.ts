import {
  IFoodCreateResponse,
  IFoodsGetAllResponse,
  IHttpClient,
} from "../adapters/HttpClientAxiosAdapter"

export interface IDatabase {
  getFoods(): Promise<IFoodsGetAllResponse>
  createFood(input: any): Promise<IFoodCreateResponse>
  deleteFood(input: any): Promise<any>
}

class FoodsDatabase implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async deleteFood(input: any): Promise<any> {
    const response = await this._httpClient.delete(input)
    return response
  }

  async createFood(input: any): Promise<IFoodCreateResponse> {
    const response = await this._httpClient.post(input)
    return response
  }

  async getFoods(): Promise<IFoodsGetAllResponse> {
    const response = await this._httpClient.get()
    return response
  }
}

export default FoodsDatabase
