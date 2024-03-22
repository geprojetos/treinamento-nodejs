import axios from "axios"
import IUserDTO from "./IUserDTO"
import { IUserDatabase } from "./IUserDatabase"
import IHttpClient from "./IHttpClient"

export default class UserDatabase implements IUserDatabase {
  private _baseUrl = "http://localhost:3000/users"
  constructor(private _httpClient: IHttpClient) {}

  async getUser(input: string): Promise<IUserDTO | undefined> {
    const response = await this._httpClient.get(this._baseUrl)
    const output = response.find((user: IUserDTO) => user.email === input)
    if (output) {
      return output
    }

    return {
      email: "",
      password: "",
      id: "",
    }
  }

  async createUser(input: IUserDTO): Promise<IUserDTO> {
    const response = await this._httpClient.create(this._baseUrl, input)
    return response
  }
}
