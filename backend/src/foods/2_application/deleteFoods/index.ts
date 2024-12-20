import DeleteFood from "../../domain/DeleteFood"
import { IDatabase, IDeleteResponse } from "../../3_resources/database"
import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"

class DeleteFoodsApplication {
  constructor(
    private _getFoodsDatabase: IDatabase,
    private _logger: ILogger,
    private _path: string
  ) {}

  async execute(req: any): Promise<IDeleteResponse> {
    try {
      this._logger.info(`DeleteFoodsApplication - execute`)
      const { query } = req
      const { id } = query
      const deleteFood = new DeleteFood(id)

      if (deleteFood.error.message.length) {
        return deleteFood.error
      }

      return await this._getFoodsDatabase.deleteFood(
        {
          id,
        },
        this._path
      )
    } catch (error) {
      this._logger.info(
        `DeleteFoodsApplication - Error execute ${error.message}`
      )
    }
  }
}

export default DeleteFoodsApplication
