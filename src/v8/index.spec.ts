import axios from "axios"
import GetFoodsUseCaseV8 from "./GetFoodsUseCase"
import IGetFoodsRepositoryV7 from "./IGetFoodsRespository"
import IFoodsDTOV7 from "./IFoodsDTO"
import Food from "./Food"

describe("Food v8", () => {
  test.skip("Devo ser capaz de consultar o cardápio do restaurante com 10% de juros", async () => {
    const response = await axios.get("http://localhost:3000/foods")
    const output = response.data.map((food: any) => ({
      ...food,
      price: (10 / 100) * food.price + food.price,
    }))
    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ])
  })

  test("Devo ser capaz de consultar o cardápio do restaurante com 10% de juros", async () => {
    const fakeRepository: IGetFoodsRepositoryV7 = {
      getAll: async (): Promise<IFoodsDTOV7[]> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const getFoodsUseCase = new GetFoodsUseCaseV8(fakeRepository)
    const output = await getFoodsUseCase.execute()
    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ])
  })

  test("Devo ser capaz de calcular a portecentagem de juros", async () => {
    const output = Food.calculateFare(10)
    expect(output).toBe(11)
  })
})
