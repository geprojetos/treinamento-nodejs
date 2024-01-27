import { IFoodDTOV5 } from "./useCases/FoodUseCase"

export default interface IFoodRepositoryV5 {
  getAll(): Promise<IFoodDTOV5[]>
}
