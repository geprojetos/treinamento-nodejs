import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import DeleteFoodsApplication from "../../2_application/deleteFoods"
import DeleteFoodsController from "./DeleteFoodsController"

const httpClient = HttpClientAxiosAdapter.getInstance()
const database = new FoodsDatabase(httpClient)
const application = new DeleteFoodsApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new DeleteFoodsController(application, serverClient)

export default controller
