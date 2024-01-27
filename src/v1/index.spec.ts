import IDatabase from "./Database"
import { IFoods } from "./Food"
import FoodRepository from "./FoodRepository"

describe("Food", () => {
  test("Should be able data database food", async () => {
    const fakeRepository: IDatabase = {
      getFoods: async function (): Promise<IFoods[]> {
        return [{ id: "123", name: "Macarronada", price: 12.5 }]
      },
    }
    const useCaseFood = new FoodRepository(fakeRepository)
    const output = await useCaseFood.get()

    expect(output).toEqual([{ id: "123", name: "Macarronada", price: 12.5 }])
  })
})
