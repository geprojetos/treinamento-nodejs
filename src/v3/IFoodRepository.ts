import { IFoodV3 } from "./IFood"

export default interface IFoodRepository {
  getFoods(): Promise<IFoodV3[]>
}
