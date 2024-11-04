import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import LoginController from "./LoginController"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import LoginDatabase from "../../3_resources/database/LoginDatabase"
import LoginApplication from "../../2_application/login"

const baseUrl = "http://localhost:3000/users"
const httpClient = HttpClientAxiosAdapter.getInstance(baseUrl)
const database = new LoginDatabase(httpClient)
const application = new LoginApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new LoginController(application, serverClient)

export default controller