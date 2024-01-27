import FoodUseCaseV5 from "./application/useCases/FoodUseCase"
import FoodRepositoryV5 from "./adapters/repository/FoodRepository"
import DatabaseJSONServerAdapter from "./infra/database/DatabaseJSONServerAdapter"
import DatabaseFileAdapter from "./infra/database/DatabaseFileAdapter"
import HttpClientAxiosAdapterV5 from "./infra/frameworks/HttpClientAxiosAdapter"
import ServerClientExpressAdapterV5 from "./infra/frameworks/ServerClientExpressAdapter"
import FoodControllerV5 from "./adapters/controllers/FoodController"
import ServerClientRestifyAdapterV5 from "./infra/frameworks/ServerClientRestifyAdapter"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

// const serverClient = new ServerClientExpressAdapterV5()
// const httpClient = new HttpClientAxiosAdapterV5(baseUrl)
// const database = new DatabaseJSONServerAdapter(httpClient)

const serverClient = new ServerClientRestifyAdapterV5()
const database = new DatabaseFileAdapter()
const foodRepository = new FoodRepositoryV5(database)
const foodUseCase = new FoodUseCaseV5(foodRepository)
const controller = new FoodControllerV5(serverClient, foodUseCase)
controller.execute()

serverClient.listen(port)
