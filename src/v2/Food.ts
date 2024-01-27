import { IFoodDTOV2 } from "./IFoodDTO"

export default class Food {
  constructor(readonly foods: IFoodDTOV2[]) {}

  calculateTotal() {
    const total = this.foods.reduce(
      (accumulator: any, current: any) => accumulator + current.price,
      0
    )
    return total
  }
}
