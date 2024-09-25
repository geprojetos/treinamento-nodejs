import { IGateway } from "../../infra/Gateway"

interface IDeleteFood {
  id: string
  isConfirm?: boolean
  callback?: () => void
}

export default class UseDeleteFood {
  constructor(private _gateway: IGateway) {}

  async execute({ id, callback, isConfirm }: IDeleteFood) {
    const response = await this._gateway.deleteFood({
      id,
      isConfirm,
    })
    if (callback) {
      callback()
    }
    return response
  }
}

export type { IDeleteFood }
