import { IDatabase } from "../../3_resources/database"

class GetFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any) {
    const { query } = req
    const category = query.category
    const response = await this._getFoodsDatabase.getFoods()
    const output = response.map((food: any) => ({
      ...food,
      price: (10 * food.price) / 100 + food.price,
    }))

    if (category === "main") {
      return output.filter((food: any) => food.category === category)
    }

    if (category === "secondary") {
      return output.filter((food: any) => food.category === category)
    }
    return output
  }
}

export default GetFoodsApplication
