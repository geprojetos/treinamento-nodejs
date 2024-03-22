import { IFoodDTO } from "./IGetFoodsRepository"

export default interface IGetFoodsDatabase {
  getAll(): Promise<IFoodDTO[]>
}
