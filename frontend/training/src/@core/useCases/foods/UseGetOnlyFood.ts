import { IGateway } from "../../infra/Gateway"

interface IUseGetOnlyFood {
  input: string
}

export default class UseGetOnlyFood {
  constructor(private _gateway: IGateway) {}

  async execute({ input }: IUseGetOnlyFood) {
    const response = await this._gateway.getOnlyFood(input)
    return response
  }
}
