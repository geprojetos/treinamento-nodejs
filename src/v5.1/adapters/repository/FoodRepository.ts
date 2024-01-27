import { IFoodDTOV5 } from "../../application/useCases/FoodUseCase"
import IFoodRepositoryV5 from "../../application/IFoodRepository"
import IDatabaseJSONServer from "../gateways/IDatabase"

export default class FoodRepositoryV5 implements IFoodRepositoryV5 {
  constructor(private _databaseJSONServer: IDatabaseJSONServer) {}

  async getAll(): Promise<IFoodDTOV5[]> {
    const output = await this._databaseJSONServer.get()
    return output
  }
}
