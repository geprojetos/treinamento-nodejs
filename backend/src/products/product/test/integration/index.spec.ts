import supertest from "supertest"
import GatewayProduct, { IGateway } from "../../../infra/gateway"
import UseCaseProduct from "../../useCase"
import ControllerProduct from "../../controller"
import { IHttpClient } from "../../../infra/httpClient/HttpClientAxiosAdapter"
import HttpClientInMemory from "../../test/InMemory/HttpClientInMemory"
import ServerClientExpressAdapter from "../../../infra/serverClient/ServerClientExpressAdapter"

const serverClient = ServerClientExpressAdapter.getInstance()
const httpClient: IHttpClient = new HttpClientInMemory()
const gateway: IGateway = new GatewayProduct(httpClient)
const useCase = new UseCaseProduct(gateway)
const controller = new ControllerProduct(useCase, serverClient)
const app = serverClient.app
controller.execute()

describe("Create product", async () => {
  test("Should be able create product", async () => {
    const input = {
      name: "test 1",
      description: "test 1",
      price: 10.99,
      category: "test 1",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 201,
      data: {
        id: data.data.id,
        ...input,
      },
    }
    expect(data).toEqual(output)
  })

  test("Should be able not create product without name", async () => {
    const input = {
      name: "",
      description: "test",
      price: 10.99,
      category: "test",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Name is required",
    }
    expect(data).toEqual(output)
  })

  test("Should be able not create product without description", async () => {
    const input = {
      name: "test",
      description: "",
      price: 10.99,
      category: "test",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Description is required",
    }
    expect(data).toEqual(output)
  })

  test("Should be able not create product without price", async () => {
    const input = {
      name: "test",
      description: "test",
      price: 0,
      category: "test",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Price is required",
    }
    expect(data).toEqual(output)
  })

  test("Should be able not create product with negative price", async () => {
    const input = {
      name: "test",
      description: "test",
      price: -10,
      category: "test",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Invalid price",
    }
    expect(data).toEqual(output)
  })

  test("Should be able not create product without category", async () => {
    const input = {
      name: "test",
      description: "test",
      price: 10,
      category: "",
    }
    const response = await supertest(app).post("/products").send(input)
    const data = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Category is required",
    }
    expect(data).toEqual(output)
  })
})

describe("List product", async () => {
  test("Should be able list products", async () => {
    const input = {
      name: "test list",
      description: "test list",
      price: 10.99,
      category: "test list",
    }
    const createResponse = await supertest(app).post("/products").send(input)
    const creteData = JSON.parse(createResponse.text)
    const response = await supertest(app).get("/products")
    const data = JSON.parse(response.text)
    const value = data.data.filter(
      (product: any) => product.id === creteData.data.id
    )
    const output = {
      status: 200,
      name: input.name,
      description: input.description,
      price: input.price,
      category: input.category,
    }
    expect(data.status).toBe(output.status)
    expect(value[0].name).toBe(output.name)
    expect(value[0].description).toBe(output.description)
    expect(value[0].price).toBe(output.price)
    expect(value[0].category).toBe(output.category)
    expect(value).toHaveLength(1)
  })
})

describe("Edit product", async () => {
  test("Should be able edit product", async () => {
    const input = {
      name: "test 3",
      description: "test 3",
      price: 10.99,
      category: "test 3",
    }
    const editInput = {
      name: "test 3",
      description: "test 3 edited",
      price: 10.99,
      category: "test 3",
    }
    const createResponse = await supertest(app).post("/products").send(input)
    const createData = JSON.parse(createResponse.text)
    const editResponse = await supertest(app)
      .patch(`/products/${createData.data.id}`)
      .send(editInput)
    const editData = JSON.parse(editResponse.text)
    const output = {
      status: 201,
      data: {
        id: createData.data.id,
        ...editInput,
      },
    }
    expect(editData).toEqual(output)
  })

  test("Should be able not edit product invalid id", async () => {
    const editResponse = await supertest(app)
      .patch(`/products/teste`)
      .send({ name: "test" })
    const editData = JSON.parse(editResponse.text)
    const output = {
      status: 400,
      message: "Not found product",
    }
    expect(editData).toEqual(output)
  })
})

describe("Delete product", async () => {
  test("Should be able edit product", async () => {
    const input = {
      name: "test 4",
      description: "test 4",
      price: 10.99,
      category: "test 4",
    }
    const createResponse = await supertest(app).post("/products").send(input)
    const createData = JSON.parse(createResponse.text)
    const deleteResponse = await supertest(app).delete(
      `/products/${createData.data.id}`
    )
    const deleteData = JSON.parse(deleteResponse.text)
    const output = {
      status: 200,
    }
    expect(deleteData).toEqual(output)
  })

  test("Should be able not edit product invalid id", async () => {
    const response = await supertest(app).delete(`/products/teste-delete`)
    const deleteData = JSON.parse(response.text)
    const output = {
      status: 400,
      message: "Invalid parameters",
    }
    expect(deleteData).toEqual(output)
  })
})
