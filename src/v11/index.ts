import GetFoodUseCase from "./GetFoodUseCase"
import GetFoodsRepository from "./GetFoodsRepository"
import GetFoodsDatabase from "./GetFoodsDatabase"
import HttpClientAxiosAdapter from "./HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"
import GetFoodsController from "./GetFoodsController"
import ServerClientRestifyAdapter from "../shared/ServerClientRestifyAdapter"
import DatabaseFileAdapter from "../shared/DatabaseFileAdapter"

const port = 3001
const serverClient = new ServerClientExpressAdapter()
// const serverClient = new ServerClientRestifyAdapter()
const httpClient = new HttpClientAxiosAdapter()
const database = new GetFoodsDatabase(httpClient)
// const database = new DatabaseFileAdapter()
const repository = new GetFoodsRepository(database)
const getFoodUseCase = new GetFoodUseCase(repository)
const controller = new GetFoodsController(serverClient, getFoodUseCase)

controller.execute()
serverClient.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
