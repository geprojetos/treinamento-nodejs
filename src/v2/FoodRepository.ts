import { IFoodDTOV2 } from "./IFoodDTO"
import { IFoodRepositoryV2 } from "./IFoodRepository"
import { IHttpClientV2 } from "./HttpClient"

class FoodJSONServerRepositoryV2 implements IFoodRepositoryV2 {
  constructor(readonly httpClient: IHttpClientV2) {}

  async get(): Promise<IFoodDTOV2[]> {
    const output = await this.httpClient.get()
    return output.data
  }
}

export { FoodJSONServerRepositoryV2 }
