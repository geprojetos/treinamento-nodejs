import GetFoodsUseCaseV6 from "./GetFoodsUseCase"
import GetFoodsJSONServerRepository from "./GetFoodsJSONServerRepository"
import DatabaseJSONServerV6 from "./DatabaseJSONServer"
import HttpClientAxiosAdapterV6 from "./HttpClientAxiosAdapter"
import ServerClientExpressAdapterV6 from "./ServerClientExpressAdapter"
import GetFoodsControllerV6 from "./GetFoodsController"
import DatabaseFileAdapterV6 from "./DatabaseFileAdapter"
import ServerClientRestifyAdapterV6 from "./ServerClientRestifyAdapter"
import Food from "./Food"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

// const serverClient = new ServerClientExpressAdapterV6()
// const httpClient = new HttpClientAxiosAdapterV6(baseUrl)
// const database = new DatabaseJSONServerV6(httpClient)

const serverClient = new ServerClientRestifyAdapterV6()
const database = new DatabaseFileAdapterV6()

const repository = new GetFoodsJSONServerRepository(database)
const useCase = new GetFoodsUseCaseV6(repository, Food.calculateFare)
const controller = new GetFoodsControllerV6(serverClient, useCase)
controller.execute()

serverClient.listen(port)
