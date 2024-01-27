import GetFoodsUseCase from "./GetFoodsUseCase"
import GetFoodRepository from "./GetFoodRepository"
import GetFoodDatabase from "./GetFoodDatabase"
import HttpClientAxiosAdapter from "./HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"
import GetFoodController from "./GetFoodController"

const port = 3001

const serverClient = new ServerClientExpressAdapter()
const httpClient = new HttpClientAxiosAdapter()
const database = new GetFoodDatabase(httpClient)
const repository = new GetFoodRepository(database)
const getFoodsUseCase = new GetFoodsUseCase(repository)
const controller = new GetFoodController(serverClient, getFoodsUseCase)

controller.execute()
serverClient.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)
})
