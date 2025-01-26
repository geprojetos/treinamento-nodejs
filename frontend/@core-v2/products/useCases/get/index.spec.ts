import UseCaseGetAllProducts from "."
import { IGateway } from "../../../infra/gateway"
import InMemoryProduct from "../../../test/inMemory/InMemoryProduct"

describe("Products Get", () => {
  let gateway: IGateway

  beforeAll(() => {
    gateway = new InMemoryProduct()
  })

  test("Should be able get products", async () => {
    const useCase = new UseCaseGetAllProducts(gateway)
    const response = await useCase.execute()
    const output = {
      status: 200,
      data: [],
    }
    expect(response).toEqual(output)
  })
})
