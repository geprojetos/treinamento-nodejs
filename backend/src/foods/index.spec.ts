import supertest from "supertest"
import FoodsDatabase from "./3_resources/database"
import GetFoodsApplication from "./2_application/getFoods"
import GetFoodsController from "./1_drivers/getFoods/GetFoodsController"
import { IHttpClient } from "./3_resources/adapters/HttpClientAxiosAdapter"
import ServerClientExpressAdapter from "./1_drivers/adapters/ServerClientExpressAdapter"
import CreateFoodsApplication from "./2_application/createFoods"
import CreateFoodsController from "./1_drivers/createFoods/CreateFoodsController"

class HttpClientMemory implements IHttpClient {
  foods: any

  constructor() {
    this.foods = []
  }

  async get(url: string): Promise<any> {
    return this.foods
  }

  async post(url: string, input: any): Promise<any> {
    this.foods.push(input)
    return this.foods
  }
}

describe("GetFoods", () => {
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
    const database = new FoodsDatabase(httpClient)
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

describe("CreateFoods", () => {
  let app: any

  beforeAll(() => {
    const httpClient = new HttpClientMemory()
    const database = new FoodsDatabase(httpClient)
    const application = new CreateFoodsApplication(database)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new CreateFoodsController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able create food", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Contra filé", price: 20, category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Success",
      status: "200",
      data: [{ name: "Contra filé", price: 20, category: "main" }],
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food name is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "", price: 20, category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Name is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food price is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Salmão", category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Price is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food category is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Salmão", price: 50, category: "" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Category is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })
})
