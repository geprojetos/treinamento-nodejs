import IGetFoodRepository, { IFoodDTO } from "./IGetFoodRepository"
import IGetFoodsDatabase from "./IGetFoodsDatabase"

export default class GetFoodsRepository implements IGetFoodRepository {
  constructor(private _getFoodsDatabase: IGetFoodsDatabase) {}

  async getAll(): Promise<IFoodDTO[]> {
    const response = await this._getFoodsDatabase.getAll()
    return response
  }
}
