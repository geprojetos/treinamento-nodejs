import { IFoodsGetAllResponse } from "../../3_resources/adapters/HttpClientAxiosAdapter"
import { IDatabase } from "../../3_resources/database"

class GetFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<IFoodsGetAllResponse> {
    const { query } = req
    const category = query.category
    const response = await this._getFoodsDatabase.getFoods()
    const output = response.data.map((food: any) => ({
      ...food,
      price: (10 * food.price) / 100 + food.price,
    }))

    if (category === "main") {
      return {
        status: response.status,
        message: response.message,
        data: output.filter((food: any) => food.category === category),
      }
    }

    if (category === "secondary") {
      return {
        status: response.status,
        message: response.message,
        data: output.filter((food: any) => food.category === category),
      }
    }
    return {
      status: response.status,
      message: response.message,
      data: output,
    }
  }
}

export default GetFoodsApplication
