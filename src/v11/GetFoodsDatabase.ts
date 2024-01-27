import IGetFoodsDatabase from "./IGetFoodsDatabase"
import { IFood } from "./IRepository"
import IHttpClient from "./IHttpClient"

export default class GetFoodsDatabase implements IGetFoodsDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async getAll(): Promise<IFood[]> {
    const response = await this._httpClient.get("http://localhost:3000/foods")
    return response
  }
}
