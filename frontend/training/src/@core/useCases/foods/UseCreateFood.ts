import { ICreateFood, IGateway } from "../../infra/Gateway"

export default class UseCreateFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: ICreateFood) {
    const response = await this._gateway.createFood(input)
    return response
  }
}
