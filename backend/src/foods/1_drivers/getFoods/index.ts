import GetFoodsApplication from "../../2_application/getFoods"
import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import GetFoodsController from "./GetFoodsController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"

const httpClient = HttpClientAxiosAdapter.getInstance()
const database = new FoodsDatabase(httpClient)
const application = new GetFoodsApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new GetFoodsController(application, serverClient)

export default controller
