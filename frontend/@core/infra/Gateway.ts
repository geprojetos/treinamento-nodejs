import GatewayValidation from "../domain/GatewayValidation"
import { ICreateFood } from "../useCases/foods/UseCreateFood"
import { IDeleteFood } from "../useCases/foods/UseDeleteFood"
import { IGetOnlyFood } from "../useCases/foods/UseGetOnlyFood"
import { IFoodsGetResponse, IHttpClient } from "./HttpAxiosAdapterClient"

interface IGateway {
  getAllFoods(): Promise<IFoodsGetResponse>
  getOnlyFood(input: IGetOnlyFood): Promise<any>
  createFood(input: ICreateFood): Promise<any>
  deleteFood(input: IDeleteFood): Promise<any>
}

export default class Gateway implements IGateway {
  constructor(private _httpClient: IHttpClient) {}

  async deleteFood(input: IDeleteFood): Promise<any> {
    if (!input?.id) {
      return GatewayValidation.isValidDelete(input.id)
    }
    if (!input?.isConfirm) {
      return GatewayValidation.isConfirmDelete(input.isConfirm!)
    }
    const response = await this._httpClient.delete(input)
    return response
  }

  async createFood(input: ICreateFood): Promise<any> {
    const response = await this._httpClient.create(input)
    return response
  }

  async getOnlyFood(input: IGetOnlyFood): Promise<any> {
    if (!input?.id) {
      return GatewayValidation.isValidDelete(input.id)
    }
    const response = await this._httpClient.getOnly(input)
    return response
  }

  async getAllFoods(): Promise<IFoodsGetResponse> {
    const response = await this._httpClient.get()
    return response
  }
}

export type { IGateway }
