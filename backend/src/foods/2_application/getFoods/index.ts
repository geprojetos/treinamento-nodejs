import GetFood from "../../domain/getFood"
import { IFoodsGetAllResponse } from "../../3_resources/adapters/HttpClientAxiosAdapter"
import { IDatabase } from "../../3_resources/database"

class GetFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<IFoodsGetAllResponse> {
    const { query } = req
    const category = query.category
    const createFood = new GetFood()
    const response = await this._getFoodsDatabase.getFoods()
    return createFood.transform({ response, category })
  }
}

export default GetFoodsApplication
