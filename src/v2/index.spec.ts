import Food from "./Food"
import { IFoodDTOV2 } from "./IFoodDTO"
import { IFoodRepositoryV2 } from "./IFoodRepository"
import { UseCaseFoodsV2 } from "./UseCaseFoods"

describe("Food V2", () => {
  const foods: IFoodDTOV2[] = [
    {
      id: "1",
      name: "Miojo",
      price: 50.0,
    },
    {
      id: "1",
      name: "Arroz branco",
      price: 20.5,
    },
  ]

  test("Should be able get foods", async () => {
    const fakeRepository: IFoodRepositoryV2 = {
      get: async function (): Promise<IFoodDTOV2[]> {
        return foods
      },
    }
    const useCaseFoods = new UseCaseFoodsV2(fakeRepository)
    const output = await useCaseFoods.execute()
    expect(output.output).toEqual(foods)
  })

  test("Should be able calculate total", () => {
    const fakeRepository: IFoodDTOV2[] = [
      {
        id: "1",
        name: "Miojo",
        price: 50.0,
      },
      {
        id: "1",
        name: "Arroz branco",
        price: 20.5,
      },
    ]
    const food = new Food(fakeRepository)
    expect(food.calculateTotal()).toBe(70.5)
  })
})
