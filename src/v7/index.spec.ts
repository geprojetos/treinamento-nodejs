import axios from "axios"
import GetFoodsUseCaseV7 from "./GetFoodsUseCase"
import IGetFoodsRepositoryV7 from "./IGetFoodsRepository"
import IFoodDTOV7 from "./IFoodsDTO"

describe("Food V7", () => {
  test.skip("Deve retornar o cardápio com juros de 10%", async () => {
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

  test("Deve retornar o cardápio com juros de 10%", async () => {
    const fakeRepository: IGetFoodsRepositoryV7 = {
      getFoods: async (): Promise<IFoodDTOV7[]> => {
        return [
          {
            id: "123",
            name: "Macarronada",
            price: 12.5,
          },
          {
            id: "123",
            name: "File de frango",
            price: 10,
          },
        ]
      },
    }
    const useCase = new GetFoodsUseCaseV7(fakeRepository)
    const output = await useCase.execute()

    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ])
  })
})
