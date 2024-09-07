import { IDatabase } from "../3_resources"

class GetFoodsApplication {
  constructor(private _database: IDatabase) {}

  async execute(req: any) {
    const { query } = req
    const response = await this._database.getFoodsResources()
    const output = response.map((food: any) => ({
      ...food,
      price: (10 * food.price) / 100 + food.price,
    }))

    if (query.category === "snack") {
      return output.filter((food: any) => food.category === query.category)
    }

    if (query.category === "dessert") {
      return output.filter((food: any) => food.category === query.category)
    }

    return output
  }
}

export default GetFoodsApplication
