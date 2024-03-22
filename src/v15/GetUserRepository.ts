import IUserDTO from "./IUserDTO"
import { IUserDatabase } from "./IUserDatabase"
import IUserRepository from "./IUserRepository"

export default class GetUSerRepository implements IUserRepository {
  constructor(private _userDatabase: IUserDatabase) {}
  async getUser(input: string): Promise<IUserDTO | undefined> {
    const response = await this._userDatabase.getUser(input)
    return response
  }

  async createUser(input: IUserDTO): Promise<any> {
    const response = await this._userDatabase.createUser({
      email: input.email,
      password: input.password,
    })
    return response
  }
}
