import {
  ILogin,
  ILoginResponse,
} from "../../3_resources/database/LoginDatabase"
import { validate } from "email-validator"

export default class Login {
  error: ILoginResponse

  constructor() {
    this.error = {
      message: "",
      status: "",
    }
  }

  isInValid(req: any) {
    const { email, password } = req.body
    if (this._getError({ email, password }).isInvalidEmailOrPassword) {
      return this._isInvalidEmailOrPassword({ email, password })
    }

    if (this._getError({ email, password }).isInvalidFormatEmail) {
      return this._isInvalidFormatEmail({ email, password })
    }
  }

  private _getError({ email, password }: ILogin) {
    const isInvalidEmailOrPassword = !email || !password
    const isInvalidFormatEmail = !validate(email)
    return {
      isInvalidEmailOrPassword,
      isInvalidFormatEmail,
    }
  }

  private _isInvalidEmailOrPassword({ email, password }: ILogin) {
    if (!email || !password) {
      return {
        status: "404",
        message: "Invalid email or password",
      }
    }
  }

  private _isInvalidFormatEmail({ email, password }: ILogin) {
    if (this._getError({ email, password }).isInvalidFormatEmail) {
      return {
        status: "404",
        message: "Invalid email",
      }
    }
  }
}
