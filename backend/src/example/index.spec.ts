import supertest from "supertest"
import { Express } from "express"
import { GetFoodsResourcesFake } from "./3_resources"
import GetFoodsApplication from "./2_application"
import GetFoodsController from "./1_drivers/GetFoodController"
import ServerClientExpressAdapter from "./1_drivers/ServerClientExpressAdapter"

let getFoodsApplication: GetFoodsApplication
let app: Express

beforeAll(() => {
  const database = new GetFoodsResourcesFake()
  getFoodsApplication = new GetFoodsApplication(database)
  const serverClient = new ServerClientExpressAdapter()
  const controller = new GetFoodsController(serverClient, getFoodsApplication)
  controller.execute()
  app = serverClient.app
})

test("Should be able supertest get all foods", async () => {
  const response = await supertest(app).get("/foods")
  const data = JSON.parse(response.text)
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
    { id: "3", name: "Sorvete", price: 22, category: "dessert" },
  ]
  expect(data).toEqual(output)
})

test("Should be able supertest get foods category snack", async () => {
  const response = await supertest(app)
    .get("/foods")
    .query({ category: "snack" })
  const data = JSON.parse(response.text)
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
  ]
  expect(data).toEqual(output)
})

test("Should be able supertest get foods category dessert", async () => {
  const response = await supertest(app)
    .get("/foods")
    .query({ category: "dessert" })
  const data = JSON.parse(response.text)
  const output = [{ id: "3", name: "Sorvete", price: 22, category: "dessert" }]
  expect(data).toEqual(output)
})

test("Should be able application get all foods", async () => {
  const request = {
    query: {},
  }
  const response = await getFoodsApplication.execute(request)
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
    { id: "3", name: "Sorvete", price: 22, category: "dessert" },
  ]
  expect(response).toEqual(output)
})

test("Should be able application params snack", async () => {
  const request = {
    query: {
      category: "snack",
    },
  }
  const response = await getFoodsApplication.execute(request)
  const output = [
    { id: "1", name: "Macarronada", price: 13.75, category: "snack" },
    { id: "2", name: "File de frango", price: 11, category: "snack" },
  ]
  expect(response).toEqual(output)
})

test("Should be able application params dessert", async () => {
  const request = {
    query: {
      category: "dessert",
    },
  }
  const response = await getFoodsApplication.execute(request)
  const output = [{ id: "3", name: "Sorvete", price: 22, category: "dessert" }]
  expect(response).toEqual(output)
})
