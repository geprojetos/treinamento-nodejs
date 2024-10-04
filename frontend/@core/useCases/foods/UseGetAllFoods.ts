import { IGateway } from "../../infra/Gateway"

export default class UseGetAllFoods {
  constructor(private _gateway: IGateway) {}

  async execute() {
    const response = await this._gateway.getAllFoods()
    return response
  }
}
