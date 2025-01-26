import UseCaseEditProduct from "."
import { IGateway } from "../../../infra/gateway"
import InMemoryProduct, {
  ICreateProductResponse,
} from "../../../test/inMemory/InMemoryProduct"
import { IProducts } from "../../domain/product"
import UseCaseCreateProduct from "../create"

describe("Products Edit", () => {
  let gateway: IGateway

  beforeAll(() => {
    gateway = new InMemoryProduct()
  })

  test("Should be able edit product", async () => {
    const useCaseCreate = new UseCaseCreateProduct(gateway)
    const inputCreate: IProducts = {
      name: "test create",
      description: "test create",
      price: 10.99,
      category: "test create",
    }
    const responseCreate = (await useCaseCreate.execute(
      inputCreate
    )) as ICreateProductResponse
    const useCase = new UseCaseEditProduct(gateway)
    const input: IProducts = {
      id: responseCreate.data.id,
      name: "test edited",
      description: "test edited",
      price: 11.99,
      category: "test edited",
    }
    const response = (await useCase.execute(input)) as ICreateProductResponse
    delete response.data.id
    const output = {
      status: 201,
      data: { ...input, id: responseCreate.data.id },
    }
    expect(response).toEqual(output)
  })

  test("Should be able not edit product not found", async () => {
    const useCase = new UseCaseEditProduct(gateway)
    const input: IProducts = {
      id: "test",
      name: "test edited",
      description: "test edited",
      price: 11.99,
      category: "test edited",
    }
    const response = await useCase.execute(input)
    const output = {
      status: 400,
      message: "Product not found",
    }
    expect(response).toEqual(output)
  })
})
