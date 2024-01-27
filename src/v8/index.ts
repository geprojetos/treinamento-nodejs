import GetFoodsUseCaseV8 from "./GetFoodsUseCase"
import GetFoodsRepositoryV8 from "./GetFoodsRepository"
import DatabaseJSONServerAdapterV8 from "./DatabaseJSONServerAdapter"
import HttpClientAxiosAdapterV8 from "./HttpClientAxiosAdapter"
import IServerClientV8 from "./IServerClient"
import ServerClientExpressAdapterV8 from "./ServerClientExpressAdapter"
import GetFoodsControllerV8 from "./GetFoodsController"
import DatabaseFileAdapterV8 from "./DatabaseFileAdapter"
import ServerClientRestifyAdapterV8 from "./ServerClientRestifyAdapter"

const port = 3001
const baseUrl = "http://localhost:3000/foods"

// const serverClient: IServerClientV8 = new ServerClientExpressAdapterV8()
const httpClient = new HttpClientAxiosAdapterV8(baseUrl)
const database = new DatabaseJSONServerAdapterV8(httpClient)

const serverClient: IServerClientV8 = new ServerClientRestifyAdapterV8()
// const database = new DatabaseFileAdapterV8()

const repository = new GetFoodsRepositoryV8(database)
const getFoodsUseCase = new GetFoodsUseCaseV8(repository)
const controller = new GetFoodsControllerV8(serverClient, getFoodsUseCase)

controller.execute()
serverClient.listen(port)
