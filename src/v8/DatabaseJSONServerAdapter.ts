import IDatabaseV7 from "./IDatabase"
import IFoodsDTOV7 from "./IFoodsDTO"
import axios from "axios"
import IHttpClientV8 from "./IHttpClient"

export default class DatabaseJSONServerAdapterV7 implements IDatabaseV7 {
  constructor(private _httpClient: IHttpClientV8) {}

  async get(): Promise<IFoodsDTOV7[]> {
    const response = await this._httpClient.get()
    return response
  }
}
