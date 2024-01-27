import GetFoodsUseCase from "./GetFoodsUseCase"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"

export default class GetFoodController {
  constructor(
    private _serverClient: ServerClientExpressAdapter,
    private _getFoodsUseCase: GetFoodsUseCase
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req: any, res: any) => {
      try {
        const output = await this._getFoodsUseCase.execute()
        res.json(output)
      } catch (error) {
        console.log("Deu ruim :(", error)
      }
    })
  }
}
