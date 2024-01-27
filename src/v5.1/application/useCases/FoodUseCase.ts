import Food from "../../entities/Food"
import IFoodRepositoryV5 from "../IFoodRepository"

export default class FoodUseCaseV5 {
  constructor(private _foodRepository: IFoodRepositoryV5) {}

  async get(): Promise<IFoodDTOV5[]> {
    const data = await this._foodRepository.getAll()
    const fare = new Food()
    const output = data.map((food) => ({
      ...food,
      price: fare.calculateFare(food.price),
    }))
    return output
  }
}

export interface IFoodDTOV5 {
  id: string
  name: string
  price: number
}
