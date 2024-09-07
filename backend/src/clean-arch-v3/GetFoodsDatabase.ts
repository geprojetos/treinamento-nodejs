import { IFoodDTO } from "./IGetFoodRepository"
import IGetFoodsDatabase from "./IGetFoodsDatabase"
import IHttpClient from "./IHttpClient"

export default class GetFoodsDatabase implements IGetFoodsDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async getAll(): Promise<IFoodDTO[]> {
    const response = await this._httpClient.get("http://localhost:3000/foods")
    return response
  }
}
