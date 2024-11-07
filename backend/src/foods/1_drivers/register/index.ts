import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import LoginDatabase from "../../3_resources/database/LoginDatabase"
import RegisterController from "./RegisterController"
import RegisterApplication from "../../2_application/registerApplication"
import LoggerPinoAdapter from "../../3_resources/adapters/LoggerPinoAdapter"

const baseUrl = "http://localhost:3000/users"
const httpClient = HttpClientAxiosAdapter.getInstance(baseUrl)
const logger = new LoggerPinoAdapter()
const database = new LoginDatabase(httpClient, logger)
const application = new RegisterApplication(database, logger)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new RegisterController(application, serverClient)

export default controller
