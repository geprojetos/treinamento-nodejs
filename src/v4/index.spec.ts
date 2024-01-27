import FoodDomain from "./FoodDomain"
import FoodUseCaseV4 from "./FoodUseCase"
import IFoodDTOV4 from "./IFoodDTO"
import IFoodRepositoryV4 from "./IFoodRepository"

describe("Food V4", () => {
  test("Should be able get foods", async () => {
    const fakeRepository: IFoodRepositoryV4 = {
      getFoods: async (): Promise<IFoodDTOV4[]> => {
        return [
          { id: "123", name: "Macarronada", price: 12.5 },
          { id: "123", name: "File de frango", price: 10 },
        ]
      },
    }
    const foodUseCase = new FoodUseCaseV4(fakeRepository)
    const output = await foodUseCase.getFoods()

    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 12.5 },
      { id: "123", name: "File de frango", price: 10 },
    ])
  })

  test("Should be able calculate total foods", async () => {
    const foods: IFoodDTOV4[] = [
      { id: "123", name: "Macarronada", price: 12.5 },
      { id: "123", name: "File de frango", price: 10 },
    ]
    const foodDomain = new FoodDomain(foods)
    const output = foodDomain.getTotal()
    expect(output).toBe(22.5)
  })
})
