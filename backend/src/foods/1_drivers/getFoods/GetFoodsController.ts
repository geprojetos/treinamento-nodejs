import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"
import GetFoodsApplication from "../../2_application/getFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class GetFoodsController {
  constructor(
    private _getFoodsApplication: GetFoodsApplication,
    private _serverClient: IServerClient,
    private _logger: ILogger
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req) => {
      try {
        this._logger.info("GetFoodsController - execute")
        const output = await this._getFoodsApplication.execute(req)
        return output
      } catch (error) {
        this._logger.error(
          `GetFoodsController - Error execute ${error.message}`
        )
      }
    })
  }
}

export default GetFoodsController
