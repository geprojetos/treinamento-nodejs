import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import LoginController from "./LoginController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import LoginDatabase from "../../3_resources/database/LoginDatabase"
import LoginApplication from "../../2_application/login"
import LoggerPinoAdapter from "../../3_resources/adapters/LoggerPinoAdapter"

const baseUrl = "http://localhost:3000"
const path = "/users"
const httpClient = HttpClientAxiosAdapter.getInstance(baseUrl)
const logger = new LoggerPinoAdapter()
const database = new LoginDatabase(httpClient, logger)
const application = new LoginApplication(database, logger, path)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new LoginController(application, serverClient)

export default controller
