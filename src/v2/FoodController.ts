import ServerClientExpressAdapter from "./ServerClientAdapter"
import { UseCaseFoodsV2 } from "./UseCaseFoods"

export default class FoodControllerV2 {
  constructor(
    readonly useCaseFood: UseCaseFoodsV2,
    readonly serverClientAdapter: ServerClientExpressAdapter
  ) {
    this.serverClientAdapter.get("/foods", async (req, res) => {
      const output = await useCaseFood.execute()
      return output
    })
  }
}
