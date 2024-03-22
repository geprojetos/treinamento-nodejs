import IGetFoodsDatabase from "./IGetFoodsDatabase"
import { IFoodDTO } from "./IGetFoodsRepository"
import IHttpClient from "./IHttpClient"

export default class GetFoodsDatabase implements IGetFoodsDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async getAll(): Promise<IFoodDTO[]> {
    const response = await this._httpClient.get("http://localhost:3000/foods")
    return response
  }
}
