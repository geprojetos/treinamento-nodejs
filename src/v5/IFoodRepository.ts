import { IFoodDTOV5 } from "./FoodUseCase"

export default interface IFoodRepositoryV5 {
  getAll(): Promise<IFoodDTOV5[]>
}
