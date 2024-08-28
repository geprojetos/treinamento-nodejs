import GetFoodsApplication from "../2_application"
import GetFoodsResourcesProduction from "../3_resources"
import GetFoodsController from "./GetFoodController"
import ServerClientExpressAdapter from "./ServerClientExpressAdapter"

const serverClient = new ServerClientExpressAdapter()
const database = new GetFoodsResourcesProduction()
const getFoodsApplication = new GetFoodsApplication(database)
const controller = new GetFoodsController(serverClient, getFoodsApplication)
controller.execute()

export default controller
