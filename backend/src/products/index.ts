import ServerClientExpressAdapter from "./infra/serverClient/ServerClientExpressAdapter"
import controllerProduct from "./product"

const port = 3001
const serverClient = ServerClientExpressAdapter.getInstance()

controllerProduct.execute()
serverClient.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
