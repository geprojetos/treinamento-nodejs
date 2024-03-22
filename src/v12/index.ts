import GetFoodsUseCase from "./GetFoodsUseCase"
import GetFoodsRepository from "./GetFoodsRepository"
import GetFoodsDatabase from "./GetFoodsDatabase"
import HttpClientAxiosAdapter from "./HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"
import GetFoodsController from "./GetFoodsController"
import ServerClientRestifyAdapter from "../shared/ServerClientRestifyAdapter"
import DatabaseFileAdapter from "../shared/DatabaseFileAdapter"
const port = 3001
// const serverClient = new ServerClientExpressAdapter()
const serverClient = new ServerClientRestifyAdapter()
const httpClient = new HttpClientAxiosAdapter()
// const database = new GetFoodsDatabase(httpClient)
const database = new DatabaseFileAdapter()
const repository = new GetFoodsRepository(database)
const getFoodsUseCase = new GetFoodsUseCase(repository)
const controller = new GetFoodsController(serverClient, getFoodsUseCase)

controller.execute()

serverClient.listen(port, () =>
  console.log(`Server is running http://locahost:${port}`)
)
