import IDatabase from "./Database"
import IFoodRepository, { IFoods } from "./Food"

export default class FoodRepository implements IFoodRepository {
  constructor(readonly database: IDatabase) {}

  async get(): Promise<IFoods[]> {
    const output = await this.database.getFoods()
    return output
  }
}
