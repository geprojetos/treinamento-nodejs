import Food from "./Food"
import { IFoodRepositoryV2 } from "./IFoodRepository"

class UseCaseFoodsV2 {
  constructor(readonly foodRepository: IFoodRepositoryV2) {}

  async execute() {
    const output = await this.foodRepository.get()
    const calculateTotal = new Food(output)
    const total = calculateTotal.calculateTotal()
    return {
      output,
      total,
    }
  }
}

export { UseCaseFoodsV2 }
