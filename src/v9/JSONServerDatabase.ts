import IDatabase from "./IDatabase"
import { IFood } from "./IRepository"
import IHttpClient from "./IHttpClient"

export default class JSONServerDatabase implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async get(): Promise<IFood[]> {
    const response = await this._httpClient.get("http://localhost:3000/foods")
    return response
  }
}
