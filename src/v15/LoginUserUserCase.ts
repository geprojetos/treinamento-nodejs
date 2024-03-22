import IUserDTO from "./IUserDTO"
import { IUserDatabase } from "./IUserDatabase"

export default class LoginUserUserCase {
  constructor(private _userDatabase: IUserDatabase) {}
  async execute(input: IUserDTO) {
    const user = await this._userDatabase.getUser(input.email)
    if (user?.email === input.email && user?.password === input.password) {
      return {
        status: "200",
        message: "Success",
        user: {
          email: user.email,
        },
      }
    }

    return {
      status: "400",
      message: "Invalid user or password",
    }
  }
}
