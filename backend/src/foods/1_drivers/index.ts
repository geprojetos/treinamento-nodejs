import ServerClientExpressAdapter from "./adapters/ServerClientExpressAdapter"
import getFoodsController from "./getFoods/index"
import createFoodsController from "./createFoods/index"
import deleteFoodsController from "./deleteFoods/index"
const port = 3001
const serverClient = ServerClientExpressAdapter.getInstance()

getFoodsController.execute()
createFoodsController.execute()
deleteFoodsController.execute()

serverClient.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
