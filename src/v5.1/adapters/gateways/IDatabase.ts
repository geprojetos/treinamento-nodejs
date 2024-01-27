import { IFoodDTOV5 } from "../../application/useCases/FoodUseCase"

export default interface IDatabaseJSONServer {
  get(): Promise<IFoodDTOV5[]>
}
