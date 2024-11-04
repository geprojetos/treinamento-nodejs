import Login from "../../domain/login"
import {
  ILoginDatabase,
  IRegisterResponse,
} from "../../3_resources/database/LoginDatabase"

class RegisterApplication {
  constructor(private _database: ILoginDatabase) {}

  async execute(req: any): Promise<IRegisterResponse> {
    const { email } = req.body
    const login = new Login()
    if (login.isInValid(req)?.message?.length > 0) {
      return login.isInValid(req)
    }

    const getUserResponse = await this._database.get()
    const isExisting = getUserResponse?.data?.filter(
      (user) => user.email === email
    )
    if (isExisting.length > 0) {
      return {
        status: "400",
        message: "Invalid register",
      }
    }

    const response = await this._database.post(req.body)
    return response
  }
}

export default RegisterApplication
