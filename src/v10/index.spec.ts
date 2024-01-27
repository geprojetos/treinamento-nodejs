import GetFoodsUseCase from "./GetFoodsUseCase"
import IRepository, { IFood } from "./IRepository"

describe("V10", () => {
  test("Deve buscar os dados da api", async () => {
    const input = [
      { id: "123", name: "Macarronada", price: 12.5 },
      { id: "123", name: "File de frango", price: 10 },
    ]
    const repository: IRepository = {
      get: async (): Promise<IFood[]> => {
        return input
      },
    }
    const getFoodsUseCase = new GetFoodsUseCase(repository)
    const response = await getFoodsUseCase.execute()
    const output = [
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ]
    expect(response).toEqual(output)
  })
})
