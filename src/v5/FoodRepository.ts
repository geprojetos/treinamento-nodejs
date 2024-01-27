import { IFoodDTOV5 } from "./FoodUseCase"
import IFoodRepositoryV5 from "./IFoodRepository"
import IDatabaseJSONServer from "./IDatabase"

export default class FoodRepositoryV5 implements IFoodRepositoryV5 {
  constructor(private _databaseJSONServer: IDatabaseJSONServer) {}

  async getAll(): Promise<IFoodDTOV5[]> {
    const output = await this._databaseJSONServer.get()
    return output
  }
}
