import FoodUseCaseV4 from "./FoodUseCase"
import FoodRepositoryV4 from "./FoodRepository"
import DatabaseJSONServer from "./DatabaseJSONServer"
import HttpClientAxiosAdapterV4 from "./HttpClientAdapter"
import ServerClientAdapterV4 from "./ServerClientAdapter"
import FoodControllerV4 from "./FoodController"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

const httpClient = new HttpClientAxiosAdapterV4(baseUrl)
const databaseJSONServer = new DatabaseJSONServer(httpClient)
const foodRepository = new FoodRepositoryV4(databaseJSONServer)
const foodUseCase = new FoodUseCaseV4(foodRepository)

const serverClientAdapter = new ServerClientAdapterV4()
new FoodControllerV4(serverClientAdapter, foodUseCase)

serverClientAdapter.listen(port)
