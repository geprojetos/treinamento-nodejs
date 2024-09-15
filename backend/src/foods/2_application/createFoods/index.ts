import { IDatabase } from "../../3_resources/database"

class CreateFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<any> {
    const { body } = req
    const { name, price, category } = body
    const response = await this._getFoodsDatabase.createFood({
      name,
      price,
      category,
    })

    if (!name) {
      return {
        message: "Name is required",
        status: "400",
      }
    }

    if (!price) {
      return {
        message: "Price is required",
        status: "400",
      }
    }

    if (!category) {
      return {
        message: "Category is required",
        status: "400",
      }
    }

    const output = {
      message: "Success",
      status: "201",
      data: response,
    }
    return output
  }
}

export default CreateFoodsApplication
