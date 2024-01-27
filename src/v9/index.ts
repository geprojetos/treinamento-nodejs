import FoodRepository from "./FoodRepository"
import UseCaseFood from "./UseCaseFood"
import JSONServerDatabase from "./JSONServerDatabase"
import HttpClientAxiosAdapter from "./HttpClientAxiosAdapter"
import HttpServerExpressAdapter from "./HttpServerExpressAdapter"
import GetController from "./GetController"

const port = 3001
const httpServerExpressAdapter = new HttpServerExpressAdapter()
const httpClientAxiosAdapter = new HttpClientAxiosAdapter()
const database = new JSONServerDatabase(httpClientAxiosAdapter)
const repository = new FoodRepository(database)
const useCase = new UseCaseFood(repository)
const controller = new GetController(httpServerExpressAdapter, useCase)
controller.execute()

httpServerExpressAdapter.listen(port, () =>
  console.log(`Server is running http://localhost:${port}`)
)
