import FoodUseCaseV5 from "./FoodUseCase"
import FoodRepositoryV5 from "./FoodRepository"
import DatabaseJSONServerAdapter from "./DatabaseJSONServerAdapter"
import HttpClientAxiosAdapterV5 from "./HttpClientAxiosAdapter"
import ServerClientExpressAdapterV5 from "./ServerClientExpressAdapter"
import FoodControllerV5 from "./FoodController"
import DatabaseFileAdapter from "./DatabaseFileAdapter"
import ServerClientRestifyAdapterV5 from "./ServerClientRestifyAdapter"
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
