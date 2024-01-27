import ServerClientAdapterV3 from "./ServerClientAdapter"
import UseCaseFoodV3 from "./UseCaseFood"

export default class IFoodControllerV3 {
  constructor(
    readonly serverClientAdapter: ServerClientAdapterV3,
    readonly useCaseFood: UseCaseFoodV3
  ) {
    this.serverClientAdapter.get("/foods", async (req, res) => {
      const output = await this.useCaseFood.getFoods()
      return output
    })
  }
}
