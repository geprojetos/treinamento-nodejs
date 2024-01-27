import IDatabaseV4 from "./IDatabase"
import IFoodDTOV4 from "./IFoodDTO"
import IFoodRepositoryV4 from "./IFoodRepository"

export default class FoodRepositoryV4 implements IFoodRepositoryV4 {
  constructor(private _database: IDatabaseV4) {}

  async getFoods(): Promise<IFoodDTOV4[]> {
    const output = await this._database.getAll()
    return output
  }
}
