import IRepository, { IFood } from "./IRepository"

export default class GetFoodsUseCase {
  constructor(private _repository: IRepository) {}

  async execute() {
    const response = await this._repository.get()
    const output = response.map((item: IFood) => ({
      ...item,
      price: (10 / 100) * item.price + item.price,
    }))
    return output
  }
}
