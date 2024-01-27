import { IFoodDTOV5 } from "./FoodUseCase"

export default interface IDatabaseJSONServer {
  get(): Promise<IFoodDTOV5[]>
}
