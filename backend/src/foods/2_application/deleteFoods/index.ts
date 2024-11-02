import { IDatabase } from "../../3_resources/database"
import { IDeleteResponse } from "../../3_resources/adapters/HttpClientAxiosAdapter"
import DeleteFood from "../../domain/deleteFood"

class DeleteFoodsApplication {
  constructor(private _getFoodsDatabase: IDatabase) {}

  async execute(req: any): Promise<IDeleteResponse> {
    const { query } = req
    const { id } = query
    const deleteFood = new DeleteFood(id)

    if (deleteFood.error.message.length) {
      return deleteFood.error
    }

    return await this._getFoodsDatabase.deleteFood({
      id,
    })
  }
}

export default DeleteFoodsApplication
