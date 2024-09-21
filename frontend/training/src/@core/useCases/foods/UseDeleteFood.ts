import { IDeleteFood, IGateway } from "../../infra/Gateway"

export default class UseDeleteFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: IDeleteFood) {
    const response = await this._gateway.deleteFood(input)
    return response
  }
}
