import IFoodDTOV4 from "./IFoodDTO"
import IFoodRepositoryV4 from "./IFoodRepository"

interface IFoodUseCase {
  getFoods(): Promise<IFoodDTOV4[]>
}

export default class FoodUseCaseV4 implements IFoodUseCase {
  constructor(private _foodRepository: IFoodRepositoryV4) {}

  async getFoods(): Promise<IFoodDTOV4[]> {
    const output = await this._foodRepository.getFoods()
    return output
  }
}

export { IFoodUseCase }
