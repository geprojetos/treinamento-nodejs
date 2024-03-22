import GetFoodsUseCase from "./GetFoodsUseCase"
import IServerClient from "./IServerClient"

export default class GetFoodsController {
  constructor(
    private _serverClient: IServerClient,
    private _getFoodsUseCase: GetFoodsUseCase
  ) {}
  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      try {
        const output = await this._getFoodsUseCase.execute()
        res.json(output)
      } catch (error) {
        console.log(error)
      }
    })
  }
}
