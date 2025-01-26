import UseCaseCreateProduct from "."
import { IGateway } from "../../../infra/gateway"
import InMemoryProduct, {
  ICreateProductResponse,
} from "../../../test/inMemory/InMemoryProduct"
import { IProducts } from "../../domain/product"

describe("Products Create", () => {
  let gateway: IGateway

  beforeAll(() => {
    gateway = new InMemoryProduct()
  })

  test("Should be able create products", async () => {
    const useCase = new UseCaseCreateProduct(gateway)
    const input: IProducts = {
      name: "test 1",
      description: "test 1",
      price: 10.99,
      category: "test 1",
    }
    const response = (await useCase.execute(input)) as ICreateProductResponse
    delete response.data.id
    const output = {
      status: 201,
      data: input,
    }
    expect(response).toEqual(output)
  })

  test("Should be able not create products, name is required", async () => {
    const useCase = new UseCaseCreateProduct(gateway)
    const input: IProducts = {
      name: "",
      description: "test 1",
      price: 10.99,
      category: "test 1",
    }
    const response = await useCase.execute(input)
    const output = {
      status: 400,
      message: "Name is required",
    }
    expect(response).toEqual(output)
  })

  test("Should be able not create products, description is required", async () => {
    const useCase = new UseCaseCreateProduct(gateway)
    const input: IProducts = {
      name: "test",
      description: "",
      price: 10.99,
      category: "test",
    }
    const response = await useCase.execute(input)
    const output = {
      status: 400,
      message: "Description is required",
    }
    expect(response).toEqual(output)
  })

  test("Should be able not create products, price is required", async () => {
    const useCase = new UseCaseCreateProduct(gateway)
    const input: IProducts = {
      name: "test",
      description: "test",
      price: 0,
      category: "test",
    }
    const response = await useCase.execute(input)
    const output = {
      status: 400,
      message: "Price is required",
    }
    expect(response).toEqual(output)
  })

  test("Should be able not create products, category is required", async () => {
    const useCase = new UseCaseCreateProduct(gateway)
    const input: IProducts = {
      name: "test",
      description: "test",
      price: 10.0,
      category: "",
    }
    const response = await useCase.execute(input)
    const output = {
      status: 400,
      message: "Category is required",
    }
    expect(response).toEqual(output)
  })
})
