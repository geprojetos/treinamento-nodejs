import CalculatePercent from "./CalculatePercent"
import GetFoodUseCase from "./GetFoodUseCase"
import IGetFoodsRepository, { IFood } from "./IRepository"

describe("V11", () => {
  test("Deve retornar os dados da api com calculo de 10%", async () => {
    const repositoryFake: IGetFoodsRepository = {
      getAll: async (): Promise<IFood[]> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const getFoodUseCase = new GetFoodUseCase(repositoryFake)
    const input = await getFoodUseCase.execute()
    const output = [
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ]
    expect(input).toEqual(output)
  })

  test("Deve calcular percentual", async () => {
    const input = CalculatePercent.calculate(50)
    const output = 55
    expect(input).toEqual(output)
  })
})
