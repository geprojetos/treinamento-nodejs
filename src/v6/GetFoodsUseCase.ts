import IGetFoodRepositoryV6 from "./IGetFoodRepository"

export default class GetFoodsUseCaseV6 {
  constructor(
    private _getFoodsRepository: IGetFoodRepositoryV6,
    private _calculateFare: (price: number) => number
  ) {}

  async execute() {
    const response = await this._getFoodsRepository.getAll()
    const output = response.map((food: any) => ({
      ...food,
      price: this._calculateFare(food.price),
    }))
    return output
  }
}
