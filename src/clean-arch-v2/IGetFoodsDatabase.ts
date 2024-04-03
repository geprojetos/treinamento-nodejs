import { IFood } from "./IRepository"

export default interface IGetFoodsDatabase {
  getAll(): Promise<IFood[]>
}
