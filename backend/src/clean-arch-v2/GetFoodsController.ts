import GetFoodUseCase from "./GetFoodUseCase"
import IServerClient from "./IServerClient"

export default class GetFoodsController {
  constructor(
    private _serverClient: IServerClient,
    private _getFoodUseCase: GetFoodUseCase
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      try {
        const output = await this._getFoodUseCase.execute()
        return output
      } catch (error: any) {
        console.log("Error GetFoodsController", error)
      }
    })
  }
}
