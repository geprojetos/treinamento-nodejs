import axios from "axios"
import IGetFoodsRepositoryV7 from "./IGetFoodsRespository"
import Food from "./Food"

export default class GetFoodsUseCaseV8 {
  constructor(private _getFoodRepository: IGetFoodsRepositoryV7) {}

  async execute() {
    const response = await this._getFoodRepository.getAll()
    const output = response.map((food) => ({
      ...food,
      price: Food.calculateFare(food.price),
    }))
    return output
  }
}
