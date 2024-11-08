import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"
import LoginApplication from "../../2_application/login"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class LoginController {
  constructor(
    private _application: LoginApplication,
    private _serverClient: IServerClient,
    private _logger: ILogger
  ) {}

  execute() {
    this._serverClient.post("/login", async (req) => {
      try {
        this._logger.info("LoginController - execute")
        const output = await this._application.execute(req)
        return output
      } catch (error) {
        this._logger.error(`LoginController - Error execute ${error.message}`)
      }
    })
  }
}

export default LoginController
