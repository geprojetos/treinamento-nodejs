import UseCaseFoodV3 from "./UseCaseFood"
import FoodRepositoryAdapterV3 from "./FoodRepositoryAdapter"
import HttpClientAdapterV3 from "./HttpClientAdapter"
import ServerClientAdapterV3 from "./ServerClientAdapter"
import IFoodControllerV3 from "./IFoodController"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

const serverClient = new ServerClientAdapterV3()
const httpClient = new HttpClientAdapterV3(baseUrl)
const foodRepository = new FoodRepositoryAdapterV3(httpClient)
const useCaseFood = new UseCaseFoodV3(foodRepository)
new IFoodControllerV3(serverClient, useCaseFood)

serverClient.listen(port)
