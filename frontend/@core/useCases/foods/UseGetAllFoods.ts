import { IGateway } from "../../infra/Gateway"
import { IFoodsGetResponse } from "../../infra/HttpAxiosAdapterClient"

export default class UseGetAllFoods {
  constructor(private _gateway: IGateway) {}

  async execute(): Promise<IFoodsGetResponse> {
    const response = await this._gateway.getAllFoods()
    return response
  }
}
