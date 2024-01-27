import CalculatePercent from "./CalculatePercent"
import IGetFoodsRepository, { IFood } from "./IRepository"

export default class GetFoodUseCase {
  constructor(private _getFoodRepository: IGetFoodsRepository) {}

  async execute() {
    const response = await this._getFoodRepository.getAll()
    const output = response.map((item: IFood) => ({
      ...item,
      price: CalculatePercent.calculate(item.price),
    }))
    return output
  }
}
