import GetFoodApplication from "../2_application"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"
const port = 3001

class FoodController {
  constructor(
    private _serverClient: ServerClientExpressAdapter,
    private _getFoodApplication: GetFoodApplication
  ) {}

  execute() {
    this._serverClient.get("/foods", async (req, res) => {
      const output = await this._getFoodApplication.execute(req)
      res.json(output)
    })

    this._serverClient.listen(port, () =>
      console.log(`Server is running http://localhost:${port}`)
    )
  }
}

export default FoodController
