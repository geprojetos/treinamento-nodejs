import supertest from "supertest"
import GetFoodsDatabase from "./3_resources/database"
import GetFoodsApplication from "./2_application/getFoods"
import GetFoodsController from "./1_drivers/getFoods/GetFoodsController"
import { IHttpClient } from "./3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "./1_drivers/adapters/ServerClientExpressAdapter"

describe("Foods", () => {
  let app: any

  beforeAll(() => {
    const httpClient: IHttpClient = {
      get: async (url: string): Promise<any> => {
        return [
          { id: "1", name: "Macarronada", price: 12.5, category: "main" },
          { id: "2", name: "File de frango", price: 10, category: "main" },
          { id: "3", name: "Sorvete", price: 20, category: "secondary" },
        ]
      },
    }
    const database = new GetFoodsDatabase(httpClient)
    const application = new GetFoodsApplication(database)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new GetFoodsController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able get all foods", async () => {
    const response = await supertest(app).get("/foods")
    const data = JSON.parse(response.text)
    const output = [
      { id: "1", name: "Macarronada", price: 13.75, category: "main" },
      { id: "2", name: "File de frango", price: 11, category: "main" },
      { id: "3", name: "Sorvete", price: 22, category: "secondary" },
    ]
    expect(data).toEqual(output)
  })

  test("Should be able get foods category main", async () => {
    const response = await supertest(app)
      .get("/foods")
      .query({ category: "main" })
    const data = JSON.parse(response.text)
    const output = [
      { id: "1", name: "Macarronada", price: 13.75, category: "main" },
      { id: "2", name: "File de frango", price: 11, category: "main" },
    ]
    expect(data).toEqual(output)
  })

  test("Should be able get foods category secondary", async () => {
    const response = await supertest(app)
      .get("/foods")
      .query({ category: "secondary" })
    const data = JSON.parse(response.text)
    const output = [
      { id: "3", name: "Sorvete", price: 22, category: "secondary" },
    ]
    expect(data).toEqual(output)
  })
})
