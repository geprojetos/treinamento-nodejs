import FoodsDatabase from "../../3_resources/database"
import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import CreateFoodsController from "./CreateFoodsController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import CreateFoodsApplication from "../../2_application/createFoods"
import LoggerPinoAdapter from "../../3_resources/adapters/LoggerPinoAdapter"

const baseURL = "http://localhost:3000/foods-v2"
const httpClient = HttpClientAxiosAdapter.getInstance(baseURL)
const logger = new LoggerPinoAdapter()
const database = new FoodsDatabase(httpClient, logger)
const application = new CreateFoodsApplication(database, logger)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new CreateFoodsController(application, serverClient)

export default controller
