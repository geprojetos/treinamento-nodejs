import IDatabase from "./IDatabase"
import IHttpClient from "./IHttpClient"
import { IFood } from "./IRepository"

export default class GetFoodDatabase implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async get(): Promise<IFood[]> {
    const response = await this._httpClient.get<IFood[]>(
      "http://localhost:3000/foods"
    )
    return response
  }
}
