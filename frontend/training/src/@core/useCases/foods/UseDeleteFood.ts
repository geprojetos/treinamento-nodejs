import { IGateway } from "../../infra/Gateway"

interface IDeleteFood {
  id: string
}

export default class UseDeleteFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: IDeleteFood) {
    const response = await this._gateway.deleteFood(input)
    return response
  }
}

export type { IDeleteFood }
