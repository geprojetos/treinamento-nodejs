import axios from "axios"
import FoodUseCaseV5, { IFoodDTOV5 } from "./FoodUseCase"
import IFoodRepositoryV5 from "./IFoodRepository"
import DatabaseFileAdapter from "./DatabaseFileAdapter"
import Food from "./Food"

describe("Food V5", () => {
  test.skip("Should be able get foods", async () => {
    const output = await axios.get("http://localhost:3000/foods")
    expect(output.data).toEqual([
      { id: "123", name: "Macarronada", price: 12.5 },
      { id: "123", name: "File de frango", price: 10 },
    ])
  })

  test("Should be able get foods with 10%", async () => {
    const fakeRepository: IFoodRepositoryV5 = {
      getAll: async (): Promise<IFoodDTOV5[]> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const foodUseCase = new FoodUseCaseV5(fakeRepository)
    const output = await foodUseCase.get()
    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 13.75 },
      { id: "123", name: "File de frango", price: 11 },
    ])
  })

  test("Should be able get foods read file", async () => {
    const database = new DatabaseFileAdapter()
    const output = await database.get()
    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 12.5 },
      { id: "123", name: "File de frango", price: 10 },
    ])
  })

  test("Should be able calculate fare", async () => {
    const food = new Food()
    const output = food.calculateFare(12.5)
    expect(output).toEqual(13.75)
  })
})
