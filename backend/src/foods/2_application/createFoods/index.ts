import { IDatabase } from "../../3_resources/database"
import CreateFood from "../../domain/createFood"

class CreateFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<any> {
    const { body } = req
    const { name, price, category } = body
    const food = new CreateFood(name, price, category)

    if (food.error.message.length) {
      return food.error
    }

    return await this._getFoodsDatabase.createFood({
      name,
      price,
      category,
    })
  }
}

export default CreateFoodsApplication
