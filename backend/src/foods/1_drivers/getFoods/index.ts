import GetFoodsApplication from "../../2_application/getFoods"
import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import GetFoodsController from "./GetFoodsController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import LoggerPinoAdapter from "../../3_resources/adapters/LoggerPinoAdapter"

const baseURL = "http://localhost:3000"
const path = "/foods-v2"
const httpClient = HttpClientAxiosAdapter.getInstance(baseURL)
const logger = new LoggerPinoAdapter()
const database = new FoodsDatabase(httpClient, logger)
const application = new GetFoodsApplication(database, logger, path)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new GetFoodsController(application, serverClient)

export default controller
