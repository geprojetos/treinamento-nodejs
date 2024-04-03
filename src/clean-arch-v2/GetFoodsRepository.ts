import IGetFoodsRepository, { IFood } from "./IRepository"
import IGetFoodsDatabase from "./IGetFoodsDatabase"

export default class GetFoodsRepository implements IGetFoodsRepository {
  constructor(private _getFoodsDatabase: IGetFoodsDatabase) {}

  async getAll(): Promise<IFood[]> {
    const response = await this._getFoodsDatabase.getAll()
    return response
  }
}
