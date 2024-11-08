import RegisterApplication from "src/foods/2_application/registerApplication"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"
import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"

class RegisterController {
  constructor(
    private _application: RegisterApplication,
    private _serverClient: IServerClient,
    private _logger: ILogger
  ) {}

  execute() {
    this._serverClient.post("/register", async (req) => {
      try {
        this._logger.info("RegisterController - execute")
        const output = await this._application.execute(req)
        return output
      } catch (error) {
        this._logger.error(
          `RegisterController - Error execute ${error.message}`
        )
      }
    })
  }
}

export default RegisterController
