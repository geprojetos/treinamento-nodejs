import { IFoodV3 } from "./IFood"
import IFoodRepositoryV3 from "./IFoodRepository"

import UseCaseFoodV3 from "./UseCaseFood"

describe("Food V3", () => {
  test("Should be able get foods", async () => {
    const fakeRepository: IFoodRepositoryV3 = {
      getFoods: async function (): Promise<IFoodV3[]> {
        return [
          { id: "1", name: "Macarronada", price: 12.5 },
          { id: "2", name: "File de frango", price: 10 },
        ]
      },
    }
    const useCaseFood = new UseCaseFoodV3(fakeRepository)
    const output = await useCaseFood.getFoods()

    expect(output).toEqual([
      { id: "1", name: "Macarronada", price: 12.5 },
      { id: "2", name: "File de frango", price: 10 },
    ])
  })
})
