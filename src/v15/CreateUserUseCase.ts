import IUserDTO from "./IUserDTO"
import EmailDomain from "./EmailDomain"
import PasswordDomain from "./PasswordDomain"
import IUserRepository from "./IUserRepository"

interface ICreateUser {
  status: string
  message: string
  user?: {
    id?: string
    email?: string
  }
}

export default class CreateUserUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(input: IUserDTO): Promise<ICreateUser> {
    if (!EmailDomain.isValidEmail(input.email)) {
      return {
        status: "400",
        message: "Invalid e-mail",
      }
    }

    if (PasswordDomain.isInValidPassword(input.password)) {
      return {
        status: "400",
        message: "Invalid password",
      }
    }

    if (input.email) {
      const response = await this._userRepository.getUser(input.email)
      if (response?.email === input.email) {
        return {
          status: "400",
          message: "User already existing",
        }
      }
    }

    const response = await this._userRepository.createUser({
      email: input.email,
      password: input.password,
    })

    if (response) {
      const output = {
        status: "201",
        message: "Success",
        user: {
          id: input.id,
          email: input.email,
        },
      }

      return output
    }

    return { status: "400", message: "Error" }
  }
}
