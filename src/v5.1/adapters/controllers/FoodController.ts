import FoodUseCaseV5 from "../../application/useCases/FoodUseCase"
import IServerClientV5 from "../gateways/IServerClient"

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
