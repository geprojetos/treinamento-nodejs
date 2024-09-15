import { IDatabase } from "../../3_resources/database"

class DeleteFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<any> {
    const { body } = req
    const { id } = body
    const response = await this._getFoodsDatabase.deleteFood({
      id,
    })

    if (response?.description) {
      return {
        ...response,
      }
    }

    if (!id) {
      return {
        message: "ID is required",
        status: "400",
      }
    }

    const output = {
      status: response.status,
      message: response.message,
    }
    return output
  }
}

export default DeleteFoodsApplication
