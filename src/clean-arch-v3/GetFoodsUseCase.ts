import Fare from "./Fare"
import IGetFoodRepository from "./IGetFoodRepository"

export default class GetFoodsUseCase {
  constructor(private _getFoodsRepository: IGetFoodRepository) {}

  async execute() {
    const response = await this._getFoodsRepository.getAll()
    const output = response.map((food: any) => ({
      ...food,
      price: Fare.calculate(food.price),
    }))
    return output
  }
}
