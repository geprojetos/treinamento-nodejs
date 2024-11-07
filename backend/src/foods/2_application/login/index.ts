import Login from "../../domain/login"
import {
  ILoginDatabase,
  ILoginResponse,
} from "../../3_resources/database/LoginDatabase"
import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"

class LoginApplication {
  constructor(private _database: ILoginDatabase, private _logger: ILogger) {}

  async execute(req: any): Promise<ILoginResponse> {
    try {
      this._logger.info(`LoginApplication - execute ${req.body}`)
      const { email, password } = req.body
      const login = new Login()
      if (login.isInValid(req)?.message?.length > 0) {
        return login.isInValid(req)
      }
      const response = await this._database.get()
      if (login.isUserNotFound({ response, email, password })) {
        return login.isUserNotFound({ response, email, password })
      }
      return login.transform({ response, email })
    } catch (error) {
      this._logger.info(`LoginApplication - Error execute ${error.message}`)
    }
  }
}

export default LoginApplication
