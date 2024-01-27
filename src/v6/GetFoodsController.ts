import GetFoodsUseCaseV6 from "./GetFoodsUseCase"
import IServerClientV6 from "./IServerClient"

export default class GetFoodsControllerV6 {
  constructor(
    private _serverClient: IServerClientV6,
    private _useCase: GetFoodsUseCaseV6
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._useCase.execute()
      res.json(output)
    })
  }
}
