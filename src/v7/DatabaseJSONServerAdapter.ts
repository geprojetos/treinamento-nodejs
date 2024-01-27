import IDatabaseV7 from "./IDatabase"
import IFoodDTOV7 from "./IFoodsDTO"
import axios from "axios"
import IHttpClientV7 from "./IHttpClient"

export default class DatabaseJSONServerAdapterV7 implements IDatabaseV7 {
  constructor(private _httpClient: IHttpClientV7) {}

  async get(): Promise<IFoodDTOV7[]> {
    const response = await this._httpClient.get()
    return response
  }
}
