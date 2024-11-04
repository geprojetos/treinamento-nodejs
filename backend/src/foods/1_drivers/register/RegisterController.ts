import RegisterApplication from "src/foods/2_application/registerApplication"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class RegisterController {
  constructor(
    private _application: RegisterApplication,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.post("/register", async (req) => {
      const output = await this._application.execute(req)
      return output
    })
  }
}

export default RegisterController
