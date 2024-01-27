import GetFoodsUseCaseV8 from "./GetFoodsUseCase"
import IServerClientV8 from "./IServerClient"

export default class GetFoodsControllerV8 {
  constructor(
    private _serverClient: IServerClientV8,
    private _getFoodsUseCase: GetFoodsUseCaseV8
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._getFoodsUseCase.execute()
      res.json(output)
    })
  }
}
