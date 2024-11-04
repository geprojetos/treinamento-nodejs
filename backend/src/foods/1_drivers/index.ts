import ServerClientExpressAdapter from "./adapters/ServerClientExpressAdapter"
import loginController from "./login/"
import registerController from "./register/"
import getFoodsController from "./getFoods"
import createFoodsController from "./createFoods"
import deleteFoodsController from "./deleteFoods"
const port = 3001
const serverClient = ServerClientExpressAdapter.getInstance()

getFoodsController.execute()
createFoodsController.execute()
deleteFoodsController.execute()
loginController.execute()
registerController.execute()

serverClient.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
