import Login from "../../domain/login"
import {
  ILoginDatabase,
  IRegisterResponse,
} from "../../3_resources/database/LoginDatabase"
import { ILogger } from "../../3_resources/adapters/LoggerPinoAdapter"

class RegisterApplication {
  constructor(
    private _database: ILoginDatabase,
    private _logger: ILogger,
    private _path: string
  ) {}

  async execute(req: any): Promise<IRegisterResponse> {
    try {
      this._logger.info(`RegisterApplication - execute ${req.body}`)
      const { email } = req.body
      const login = new Login()
      if (login.isInValid(req)?.message?.length > 0) {
        return login.isInValid(req)
      }

      const getUserResponse = await this._database.get(this._path)
      const isExisting = getUserResponse?.data?.filter(
        (user) => user.email === email
      )
      if (isExisting.length > 0) {
        return {
          status: "400",
          message: "Invalid register",
        }
      }

      const response = await this._database.post(req.body, this._path)
      return response
    } catch (error) {
      this._logger.info(`RegisterApplication - Error execute ${error.message}`)
    }
  }
}

export default RegisterApplication
