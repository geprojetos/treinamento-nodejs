import { UseCaseFoodsV2 } from "./UseCaseFoods"
import { FoodJSONServerRepositoryV2 } from "./FoodRepository"
import HttpClientAxiosAdapterV2 from "./HttpClientAdapter"
import ServerClientExpressAdapter from "./ServerClientAdapter"
import FoodControllerV2 from "./FoodController"
const port = 3001
const baseUrl = "http://localhost:3000/foods"

const serverClientAdapter = new ServerClientExpressAdapter()
const httpClient = new HttpClientAxiosAdapterV2(baseUrl)
const foodRepository = new FoodJSONServerRepositoryV2(httpClient)
const useCaseFoodsV2 = new UseCaseFoodsV2(foodRepository)
new FoodControllerV2(useCaseFoodsV2, serverClientAdapter)

serverClientAdapter.listen(port)
