import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"
import DeleteFoodsApplication from "../../2_application/deleteFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class DeleteFoodsController {
  constructor(
    private _getFoodsApplication: DeleteFoodsApplication,
    private _serverClient: IServerClient,
    private _logger: ILogger
  ) {}

  execute() {
    this._serverClient.delete("/foods", async (req) => {
      try {
        this._logger.info("DeleteFoodsController - execute")
        const output = await this._getFoodsApplication.execute(req)
        return output
      } catch (error) {
        this._logger.error(
          `DeleteFoodsController - Error execute ${error.message}`
        )
      }
    })
  }
}

export default DeleteFoodsController
