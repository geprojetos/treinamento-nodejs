import Login from "../../domain/login"
import {
  ILoginDatabase,
  ILoginResponse,
} from "../../3_resources/database/LoginDatabase"

class LoginApplication {
  constructor(private _database: ILoginDatabase) {}

  async execute(req: any): Promise<ILoginResponse> {
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
  }
}

export default LoginApplication
