import GetFoodsUseCase from "./GetFoodsUseCase"
import Fare from "./Fare"
import GetFoodsRepository from "./GetFoodsRepository"
import GetFoodsDatabase from "./GetFoodsDatabase"
import IHttpClient from "./IHttpClient"

describe("V12", () => {
  test("Deve retornar dados api calculando 10% de juros", async () => {
    const httpClient: IHttpClient = {
      get: async (url: string): Promise<any> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const database = new GetFoodsDatabase(httpClient)
    const repository = new GetFoodsRepository(database)
    const getFoodsUseCase = new GetFoodsUseCase(repository)
    const input = await getFoodsUseCase.execute()
    const output = [
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ]
    expect(input).toEqual(output)
  })

  test("Deve calcular juros", async () => {
    const input = Fare.calculate(10)
    const output = 11
    expect(input).toEqual(output)
  })
})
