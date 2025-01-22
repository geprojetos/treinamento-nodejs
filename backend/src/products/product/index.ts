import UseCaseProduct from "./useCase"
import ControllerProduct from "./controller"
import GatewayProduct from "../infra/gateway"
import HttpClientAxiosAdapter from "../infra/httpClient/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "../infra/serverClient/ServerClientExpressAdapter"

const baseUrl = "http://localhost:3000"
const url = "/products"
const httpClient = HttpClientAxiosAdapter.getInstance(baseUrl, url)
const gateway = new GatewayProduct(httpClient)
const useCase = new UseCaseProduct(gateway)
const serverClient = ServerClientExpressAdapter.getInstance()
const controller = new ControllerProduct(useCase, serverClient)

export default controller
