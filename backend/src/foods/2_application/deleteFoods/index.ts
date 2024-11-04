import DeleteFood from "../../domain/DeleteFood"
import { IDatabase, IDeleteResponse } from "../../3_resources/database"

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
