import GetFoodsUseCaseV7 from "./GetFoodsUseCase"
import GetFoodsRepositoryV7 from "./GetFoodsRepository"
import DatabaseJSONServerAdapterV7 from "./DatabaseJSONServerAdapter"
import HttpClientAxiosAdapterV7 from "./HttpClientAxiosAdater"
import ServerClientAdapterExpressV7 from "./ServerClientAdapterExpress"
import GetFoodsController from "./GetFoodsController"
import DatabaseFileAdapterV7 from "./DatabaseFileAdapter"
import ServerClientRestifyAdapterV7 from "./ServerClientRestifyAdapter"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

// const serverClient = new ServerClientAdapterExpressV7()
// const httpClient = new HttpClientAxiosAdapterV7(baseUrl)
// const database = new DatabaseJSONServerAdapterV7(httpClient)

const serverClient = new ServerClientRestifyAdapterV7()
const database = new DatabaseFileAdapterV7()

const repository = new GetFoodsRepositoryV7(database)
const useCase = new GetFoodsUseCaseV7(repository)
const controller = new GetFoodsController(serverClient, useCase)
controller.execute()

serverClient.listen(port)
