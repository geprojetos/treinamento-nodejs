import IFoodDTOV4 from "./IFoodDTO"

export default class FoodDomain {
  constructor(readonly output: IFoodDTOV4[]) {}

  getTotal() {
    const total = this.output.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    )
    return total
  }
}
