import Food from "../../domain/Food"
import { IGateway } from "../../infra/Gateway"

interface ICreateFood {
  name: string
  price: number
  category: string
}

export default class UseCreateFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: ICreateFood, callBack?: () => void) {
    const food = new Food({
      name: input.name,
      price: input.price,
      category: input.category,
    })
    if (food.isInValid()) {
      return food.error
    }

    const response = await this._gateway.createFood(input)
    if (response?.status === "201" && callBack) {
      callBack()
    }
    return response
  }
}

export type { ICreateFood }
