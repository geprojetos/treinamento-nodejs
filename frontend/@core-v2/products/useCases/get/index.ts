import { IGateway } from "../../../infra/gateway"

export default class UseCaseGetAllProducts {
  constructor(private _gateway: IGateway) {}

  async execute() {
    try {
      const response = await this._gateway.getAll()
      return response
    } catch (error: any) {
      console.log("Error UseCaseGetAllProducts", error.message)
    }
  }
}
