import { IGateway } from "../../infra/Gateway"

interface IGetOnlyFood {
  id: string
}

export default class UseGetOnlyFood {
  constructor(private _gateway: IGateway) {}

  async execute(input: IGetOnlyFood) {
    const response = await this._gateway.getOnlyFood(input)
    return response
  }
}

export type { IGetOnlyFood }
