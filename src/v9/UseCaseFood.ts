import IRepository, { IFood } from "./IRepository"

export default class UseCaseFood {
  constructor(private _repository: IRepository) {}

  async get(): Promise<IFood[]> {
    const response = await this._repository.get()
    const output: IFood[] = response.map((item) => ({
      ...item,
      price: (20 / 100) * item.price + item.price,
    }))
    return output
  }
}
