import supertest from "supertest"
import { DatabaseFake } from "./3_resources"
import GetFoodApplication from "./2_application"
import ServerClientExpressAdapter from "./1_drivers/ServerClientExpressAdapter"
import HttpClientAdapter from "src/clean-arch-v1/HttpClientAdapter"
import FoodController from "./1_drivers/FoodController"

let serverClient: ServerClientExpressAdapter
let database: DatabaseFake

beforeAll(() => {
  serverClient = new ServerClientExpressAdapter()
  const httpClient = new HttpClientAdapter()
  database = new DatabaseFake(httpClient)
  const getFoodApplication = new GetFoodApplication(database)
  const controller = new FoodController(serverClient, getFoodApplication)
  controller.execute()
})

test("Should de able get all foods", async () => {
  const response = await supertest(serverClient._app).get("/foods")
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
    { id: "3", name: "Sorvete", price: 22, category: "dessert" },
  ]
  expect(response.status).toEqual(200)
  expect(JSON.parse(response.text)).toEqual(output)
})

test("Should de able get foods category principal", async () => {
  const response = await supertest(serverClient._app)
    .get("/foods")
    .query({ category: "snack" })
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
  ]
  expect(response.status).toEqual(200)
  expect(JSON.parse(response.text)).toEqual(output)
})

test("Should de able get foods category dessert", async () => {
  const response = await supertest(serverClient._app)
    .get("/foods")
    .query({ category: "dessert" })
  const output = [{ id: "3", name: "Sorvete", price: 22, category: "dessert" }]
  expect(response.status).toEqual(200)
  expect(JSON.parse(response.text)).toEqual(output)
})

test("Should de able application with params dessert", async () => {
  const getFoodApplication = new GetFoodApplication(database)
  const input = {
    query: {
      category: "dessert",
    },
  }
  const output = [{ id: "3", name: "Sorvete", price: 22, category: "dessert" }]
  const dto = await getFoodApplication.execute(input)
  expect(dto).toEqual(output)
})

test("Should de able application with params principal", async () => {
  const getFoodApplication = new GetFoodApplication(database)
  const input = {
    query: {
      category: "snack",
    },
  }
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
  ]
  const dto = await getFoodApplication.execute(input)

  expect(dto).toEqual(output)
})
