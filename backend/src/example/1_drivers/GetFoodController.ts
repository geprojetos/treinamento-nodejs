import GetFoodsApplication from "../2_application"
import { IServerClient } from "./ServerClientExpressAdapter"
const port = 3001

class GetFoodsController {
  constructor(
    private _serverClient: IServerClient,
    private _getFoodsApplication: GetFoodsApplication
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._getFoodsApplication.execute(req)
      res.json(output)
    })
    this._serverClient.listen(port, () =>
      console.log(`Server is running http://localhost${port}`)
    )
  }
}

export default GetFoodsController
