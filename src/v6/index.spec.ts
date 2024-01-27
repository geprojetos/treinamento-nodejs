import axios from "axios"
import GetFoodsUseCaseV6 from "./GetFoodsUseCase"
import IGetFoodRepositoryV6 from "./IGetFoodRepository"
import IFoodDTOV6 from "./IFoodDTO"
import IDatabaseV6 from "./IDatabase"
import Food from "./Food"

describe("Food v6", () => {
  test.skip("Should be able get foods with fare", async () => {
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

  test("Should be able get foods with fare", async () => {
    const fakeDatabase: IDatabaseV6 = {
      get: async (): Promise<IFoodDTOV6[]> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const fakeRepository: IGetFoodRepositoryV6 = {
      getAll: async (): Promise<IFoodDTOV6[]> => {
        return fakeDatabase.get()
      },
    }
    const useCase = new GetFoodsUseCaseV6(fakeRepository, Food.calculateFare)
    const output = await useCase.execute()
    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ])
  })

  test("Should be able calculate fare", async () => {
    const output = Food.calculateFare(12.5)
    expect(output).toBe(13.75)
  })
})
