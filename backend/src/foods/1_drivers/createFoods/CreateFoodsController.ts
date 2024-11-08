import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"
import CreateFoodsApplication from "../../2_application/createFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class CreateFoodsController {
  constructor(
    private _getFoodsApplication: CreateFoodsApplication,
    private _serverClient: IServerClient,
    private _logger: ILogger
  ) {}

  execute() {
    this._serverClient.post("/foods", async (req) => {
      try {
        this._logger.info("CreateFoodsController - execute")
        const output = await this._getFoodsApplication.execute(req)
        return output
      } catch (error) {
        this._logger.error(
          `CreateFoodsController - Error execute ${error.message}`
        )
      }
    })
  }
}

export default CreateFoodsController
