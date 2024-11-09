import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"
import { IDatabase } from "../../3_resources/database"
import CreateFood from "../../domain/createFood"

class CreateFoodsApplication {
  constructor(
    private _getFoodsDatabase: IDatabase,
    private _logger: ILogger,
    private _path: string
  ) {}

  async execute(req: any): Promise<any> {
    try {
      this._logger.info(`CreateFoodsApplication - execute`)
      const { body } = req
      const { name, price, category } = body
      const food = new CreateFood(name, price, category)

      if (food.error.message.length) {
        return food.error
      }

      return await this._getFoodsDatabase.createFood(
        {
          name,
          price,
          category,
        },
        this._path
      )
    } catch (error) {
      this._logger.info(
        `CreateFoodsApplication - Error execute ${error.message}`
      )
    }
  }
}

export default CreateFoodsApplication
