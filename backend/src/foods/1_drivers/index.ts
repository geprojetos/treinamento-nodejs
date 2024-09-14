import ServerClientExpressAdapter from "./adapters/ServerClientExpressAdapter"
import getFoodsController from "./getFoods/index"
const port = 3001
const serverClient = ServerClientExpressAdapter.getInstance()

getFoodsController.execute()

serverClient.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
