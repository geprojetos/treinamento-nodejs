import ServerClientExpressAdapter from "./adapters/ServerClientExpressAdapter"
import loginController from "./login/"
import registerController from "./register/"
import getFoodsController from "./getFoods"
import createFoodsController from "./createFoods"
import deleteFoodsController from "./deleteFoods"
import config from "../config"
const serverClient = ServerClientExpressAdapter.getInstance()

getFoodsController.execute()
createFoodsController.execute()
deleteFoodsController.execute()
loginController.execute()
registerController.execute()

serverClient.listen(config.port, () =>
  console.log(`Server is running http://localhost:${config.port}`)
)
