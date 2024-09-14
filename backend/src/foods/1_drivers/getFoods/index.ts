import GetFoodsApplication from "../../2_application/getFoods"
import GetFoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import GetFoodsController from "./GetFoodsController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"

const httpClient = new HttpClientAxiosAdapter()
const database = new GetFoodsDatabase(httpClient)
const application = new GetFoodsApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new GetFoodsController(application, serverClient)

export default controller
