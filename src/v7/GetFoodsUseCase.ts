import axios from "axios"
import IFoodDTOV7 from "./IFoodsDTO"
import IGetFoodsRepositoryV7 from "./IGetFoodsRepository"

export default class GetFoodsUseCaseV7 {
  constructor(private _getFoodsRepository: IGetFoodsRepositoryV7) {}

  async execute(): Promise<IFoodDTOV7[]> {
    const response = await this._getFoodsRepository.getFoods()
    const output = response.map((food: IFoodDTOV7) => ({
      ...food,
      price: (10 / 100) * food.price + food.price,
    }))
    return output
  }
}
