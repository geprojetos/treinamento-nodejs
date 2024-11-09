import {
  ILogin,
  ILoginResponse,
} from "../../3_resources/database/LoginDatabase"
import { validate } from "email-validator"
import { sign } from "jsonwebtoken"
import { compareSync } from "bcrypt"

interface IUserNotFound {
  response: ILoginResponse
  email: string
  password: string
}

interface ITransform {
  response: ILoginResponse
  email: string
}

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

  generateToken(email: string) {
    const secret = "my-secret"
    const token = sign({ email }, secret)
    return token
  }

  isUserNotFound({ response, email, password }: IUserNotFound) {
    const isUser = response?.data?.filter((user) => user.email === email)[0]
    const isValidPassword = compareSync(password, isUser.password)
    const isInvalidLogin = isUser.email !== email || !isValidPassword
    if (isInvalidLogin) {
      return {
        status: "400",
        message: "Invalid login",
      }
    }
  }

  transform({ response, email }: ITransform): ILoginResponse {
    return {
      status: response.status,
      message: response.message,
      data: response?.data
        ?.filter((user) => user.email === email)
        ?.map((user) => ({ email: user.email })),
      token: this.generateToken(email),
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
        status: "400",
        message: "Invalid email or password",
      }
    }
  }

  private _isInvalidFormatEmail({ email, password }: ILogin) {
    if (this._getError({ email, password }).isInvalidFormatEmail) {
      return {
        status: "400",
        message: "Invalid email",
      }
    }
  }
}
