import IFoodsV3, { IFoodV3 } from "./IFood"
import IFoodRepositoryV3 from "./IFoodRepository"

export default class UseCaseFoodV3 implements IFoodsV3 {
  constructor(readonly foodRepository: IFoodRepositoryV3) {}

  async getFoods(): Promise<IFoodV3[]> {
    const output = await this.foodRepository.getFoods()
    return output
  }
}
