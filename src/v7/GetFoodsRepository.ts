import axios from "axios"

import IFoodDTOV7 from "./IFoodsDTO"
import IGetFoodsRepositoryV7 from "./IGetFoodsRepository"
import IDatabaseV7 from "./IDatabase"

export default class GetFoodsRepositoryV7 implements IGetFoodsRepositoryV7 {
  constructor(private _dataJSONServer: IDatabaseV7) {}

  async getFoods(): Promise<IFoodDTOV7[]> {
    const response = await this._dataJSONServer.get()
    return response
  }
}
