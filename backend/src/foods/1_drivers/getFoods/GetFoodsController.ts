import GetFoodsApplication from "../../2_application/getFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class GetFoodsController {
  constructor(
    private _getFoodsApplication: GetFoodsApplication,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req) => {
      const output = await this._getFoodsApplication.execute(req)
      return output
    })
  }
}

export default GetFoodsController
