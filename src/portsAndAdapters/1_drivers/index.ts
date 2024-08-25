import DatabaseProduction from "../3_resources"
import GetFoodApplication from "../2_application"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"
import FoodController from "./FoodController"
import HttpClientAdapter from "src/clean-arch-v1/HttpClientAdapter"

const serverClient = new ServerClientExpressAdapter()
const httpClient = new HttpClientAdapter()
const database = new DatabaseProduction(httpClient)
const getFoodApplication = new GetFoodApplication(database)
const controller = new FoodController(serverClient, getFoodApplication)
controller.execute()

export { serverClient }
