import IUserDTO from "./IUserDTO"

export interface IUserDatabase {
  getUser(id: string): Promise<IUserDTO | undefined>
  createUser(input: IUserDTO): Promise<IUserDTO | undefined>
}
