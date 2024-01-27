import IFoodDTOV6 from "./IFoodDTO"
import IGetFoodRepositoryV6 from "./IGetFoodRepository"
import IDatabaseV6 from "./IDatabase"

export default class GetFoodsJSONServerRepository
  implements IGetFoodRepositoryV6
{
  constructor(private _databaseJSONServer: IDatabaseV6) {}

  async getAll(): Promise<IFoodDTOV6[]> {
    const output = await this._databaseJSONServer.get()
    return output
  }
}
