import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import CreateFoodsController from "./CreateFoodsController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import CreateFoodsApplication from "../../2_application/createFoods"

const httpClient = new HttpClientAxiosAdapter()
const database = new FoodsDatabase(httpClient)
const application = new CreateFoodsApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new CreateFoodsController(application, serverClient)

export default controller
