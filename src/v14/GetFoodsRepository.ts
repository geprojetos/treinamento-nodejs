import IGetFoodsRepository, { IFoodDTO } from "./IGetFoodsRepository"
import IGetFoodsDatabase from "./IGetFoodsDatabase"

export default class GetFoodsRepository implements IGetFoodsRepository {
  constructor(private _getFoodsDatabase: IGetFoodsDatabase) {}

  async getAll(): Promise<IFoodDTO[]> {
    const response = await this._getFoodsDatabase.getAll()
    return response
  }
}
