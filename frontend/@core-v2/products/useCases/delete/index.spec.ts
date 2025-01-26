import UseCaseDeleteProduct from "."
import { IGateway } from "../../../infra/gateway"
import InMemoryProduct, {
  ICreateProductResponse,
} from "../../../test/inMemory/InMemoryProduct"
import { IProducts } from "../../domain/product"
import UseCaseCreateProduct from "../create"

describe("Products Delete", () => {
  let gateway: IGateway

  beforeAll(() => {
    gateway = new InMemoryProduct()
  })

  test("Should be able delete product", async () => {
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
    const useCase = new UseCaseDeleteProduct(gateway)
    const response = await useCase.execute(responseCreate.data.id!)
    const output = {
      status: 200,
    }
    expect(response).toEqual(output)
  })

  test("Should be able not delete product not found", async () => {
    const useCase = new UseCaseDeleteProduct(gateway)
    const input = {
      id: "test",
    }
    const response = await useCase.execute(input.id)
    const output = {
      status: 400,
      message: "Product not found",
    }
    expect(response).toEqual(output)
  })
})
