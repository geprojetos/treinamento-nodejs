import IDatabaseV6 from "./IDatabase"
import IFoodDTOV6 from "./IFoodDTO"
import IHttpClientV6 from "./IHttpClient"

export default class DatabaseJSONServerV6 implements IDatabaseV6 {
  constructor(private _httpClient: IHttpClientV6) {}

  async get(): Promise<IFoodDTOV6[]> {
    const output = await this._httpClient.get()
    return output
  }
}
