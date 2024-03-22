import { IFoodDTO } from "./IGetFoodRepository"

export default interface IGetFoodsDatabase {
  getAll(): Promise<IFoodDTO[]>
}
