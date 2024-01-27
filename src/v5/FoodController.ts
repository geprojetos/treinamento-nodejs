import FoodUseCaseV5 from "./FoodUseCase"
import IServerClientV5 from "./IServerClient"

export default class FoodControllerV5 {
  constructor(
    private _serverClient: IServerClientV5,
    private _foodUseCase: FoodUseCaseV5
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._foodUseCase.get()
      res.json(output)
    })
  }
}
