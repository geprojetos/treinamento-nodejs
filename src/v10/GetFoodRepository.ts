import IRepository, { IFood } from "./IRepository"
import IDatabase from "./IDatabase"

export default class GetFoodRepository implements IRepository {
  constructor(private _dataBase: IDatabase) {}

  async get(): Promise<IFood[]> {
    const response = await this._dataBase.get()
    return response
  }
}
