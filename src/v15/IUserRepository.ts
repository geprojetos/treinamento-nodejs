import IUserDTO from "./IUserDTO"

export default interface IUserRepository {
  getUser(email: string): Promise<IUserDTO | undefined>
  createUser(input: IUserDTO): Promise<any>
}
