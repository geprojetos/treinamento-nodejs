import GetFoodsUseCaseV7 from "./GetFoodsUseCase"
import IServerClientV7 from "./IServerClient"

export default class GetFoodsController {
  constructor(
    private _serverClient: IServerClientV7,
    private _useCase: GetFoodsUseCaseV7
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._useCase.execute()
      res.json(output)
    })
  }
}
