import IDatabase from "./IDatabase"
import IRepository, { IFood } from "./IRepository"

export default class FoodRepository implements IRepository {
  constructor(private _database: IDatabase) {}

  async get(): Promise<IFood[]> {
    const response = await this._database.get()
    return response
  }
}
