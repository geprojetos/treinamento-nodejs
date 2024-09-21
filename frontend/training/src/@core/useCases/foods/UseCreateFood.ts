import Food from "../../domain/Food"
import { IGateway } from "../../infra/Gateway"

interface ICreateFood {
  name: string
  price: number
  category: string
}

export default class UseCreateFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: ICreateFood) {
    const food = new Food({
      name: input.name,
      price: input.price,
      category: input.category,
    })
    if (food.isInValid()) {
      return food.error
    }

    const response = await this._gateway.createFood(input)
    return response
  }
}

export type { ICreateFood }
