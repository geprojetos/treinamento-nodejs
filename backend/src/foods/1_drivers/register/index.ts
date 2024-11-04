import HttpClientAxiosAdapter from "../../3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "../adapters/ServerClientExpressAdapter"
import LoginDatabase from "../../3_resources/database/LoginDatabase"
import RegisterController from "./RegisterController"
import RegisterApplication from "../../2_application/registerApplication"

const baseUrl = "http://localhost:3000/users"
const httpClient = HttpClientAxiosAdapter.getInstance(baseUrl)
const database = new LoginDatabase(httpClient)
const application = new RegisterApplication(database)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new RegisterController(application, serverClient)

export default controller
