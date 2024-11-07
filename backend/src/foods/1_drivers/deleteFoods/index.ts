import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import DeleteFoodsApplication from "../../2_application/deleteFoods"
import DeleteFoodsController from "./DeleteFoodsController"
import LoggerPinoAdapter from "../../3_resources/adapters/LoggerPinoAdapter"

const baseURL = "http://localhost:3000"
const path = "/foods-v2"
const httpClient = HttpClientAxiosAdapter.getInstance(baseURL)
const logger = new LoggerPinoAdapter()
const database = new FoodsDatabase(httpClient, logger)
const application = new DeleteFoodsApplication(database, logger, path)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new DeleteFoodsController(application, serverClient)

export default controller
