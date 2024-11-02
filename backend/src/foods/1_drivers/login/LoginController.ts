import LoginApplication from "../../2_application/login"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class LoginController {
  constructor(
    private _application: LoginApplication,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.post("/login", async (req) => {
      const output = await this._application.execute(req)
      return output
    })
  }
}

export default LoginController
