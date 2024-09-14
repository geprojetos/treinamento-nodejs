import CreateFoodsApplication from "../../2_application/createFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class CreateFoodsController {
  constructor(
    private _getFoodsApplication: CreateFoodsApplication,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.post("/foods", async (req) => {
      const output = await this._getFoodsApplication.execute(req)
      return output
    })
  }
}

export default CreateFoodsController
