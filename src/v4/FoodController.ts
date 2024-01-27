import FoodUseCaseV4 from "./FoodUseCase"
import ServerClientAdapterV4 from "./ServerClientAdapter"

export default class FoodControllerV4 {
  constructor(
    private _serverClientAdapter: ServerClientAdapterV4,
    private _foodUseCase: FoodUseCaseV4
  ) {
    this._serverClientAdapter.get("/foods", async (req, res) => {
      const output = await this._foodUseCase.getFoods()
      res.json(output)
    })
  }
}
