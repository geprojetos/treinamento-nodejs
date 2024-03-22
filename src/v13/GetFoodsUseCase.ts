import Fare from "./Fare"
import IGetFoodsRepository, { IFoodDTO } from "./IGetFoodsRepository"

export default class GetFoodsUseCase {
  constructor(private _getFoodsRepository: IGetFoodsRepository) {}

  async execute() {
    const response = await this._getFoodsRepository.getAll()
    const output = response.map((food: IFoodDTO) => ({
      ...food,
      price: Fare.calculate(food.price),
    }))
    return output
  }
}
