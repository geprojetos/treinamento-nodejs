import GetFood from "../../domain/getFood"
import { IFoodsGetAllResponse } from "../../3_resources/database"
import { IDatabase } from "../../3_resources/database"
import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"

class GetFoodsApplication {
  constructor(
    private _getFoodsDatabase: IDatabase,
    private _logger: ILogger,
    private _path: string
  ) {}

  async execute(req: any): Promise<IFoodsGetAllResponse> {
    try {
      this._logger.info(`GetFoodsApplication - execute`)
      const { query } = req
      const category = query.category
      const createFood = new GetFood()
      const response = await this._getFoodsDatabase.getFoods(this._path)
      return createFood.transform({ response, category })
    } catch (error) {
      this._logger.info(`GetFoodsApplication - Error execute ${error.message}`)
    }
  }
}

export default GetFoodsApplication
