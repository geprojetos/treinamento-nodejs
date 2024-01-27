import IDatabaseV4 from "./IDatabase"
import IFoodDTOV4 from "./IFoodDTO"
import IHttpClientV4 from "./IHttpCLient"

export default class DatabaseJSONServer implements IDatabaseV4 {
  constructor(private _httpCLient: IHttpClientV4) {}

  async getAll(): Promise<IFoodDTOV4[]> {
    const output = await this._httpCLient.get()
    return output
  }
}
