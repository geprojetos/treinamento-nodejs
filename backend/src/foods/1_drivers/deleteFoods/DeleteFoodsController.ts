import DeleteFoodsApplication from "../../2_application/deleteFoods"
import { IServerClient } from "../adapters/ServerClientExpressAdapter"

class DeleteFoodsController {
  constructor(
    private _getFoodsApplication: DeleteFoodsApplication,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.delete("/foods", async (req) => {
      const output = await this._getFoodsApplication.execute(req)
      return output
    })
  }
}

export default DeleteFoodsController
