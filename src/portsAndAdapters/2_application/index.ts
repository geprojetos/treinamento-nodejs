import { IDatabase } from "../3_resources"

class GetFoodApplication {
  constructor(readonly database: IDatabase) {}

  async execute(req: any) {
    const { query } = req
    const response = await this.database.getFoodsResources()
    const output = this._outputTransform(response)
    if (query.category === "snack") return this._getCategory(query, output)
    if (query.category === "dessert") return this._getCategory(query, output)
    return output
  }

  private _outputTransform(response: any) {
    return response.map((item: any) => {
      return {
        ...item,
        price: this._calculatePercetage(10, item.price),
      }
    })
  }

  private _calculatePercetage(percentage: number, value: number) {
    return (percentage * value) / 100 + value
  }

  private _getCategory(query: any, output: any) {
    return output.filter((food: any) => food.category === query.category)
  }
}

export default GetFoodApplication
