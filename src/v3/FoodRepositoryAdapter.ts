import { IFoodV3 } from "./IFood"
import IFoodRepositoryV3 from "./IFoodRepository"
import HttpClientV3 from "./IHttpClient"

export default class FoodRepositoryAdapterV3 implements IFoodRepositoryV3 {
  constructor(readonly httpClient: HttpClientV3) {}

  async getFoods(): Promise<IFoodV3[]> {
    const output = await this.httpClient.get()
    return output.data
  }
}
