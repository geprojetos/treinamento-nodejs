import IFoodsDTOV7 from "./IFoodsDTO"
import IGetFoodsRepositoryV7 from "./IGetFoodsRespository"
import IDatabaseV7 from "./IDatabase"

export default class GetFoodsRepositoryV7 implements IGetFoodsRepositoryV7 {
  constructor(private _databaseJSONServer: IDatabaseV7) {}

  async getAll(): Promise<IFoodsDTOV7[]> {
    const response = await this._databaseJSONServer.get()
    return response
  }
}
