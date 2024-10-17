import GatewayValidation from "../domain/GatewayValidation"
import { ICreateFood } from "../useCases/foods/UseCreateFood"
import { IDeleteFood } from "../useCases/foods/UseDeleteFood"
import { IGetOnlyFood } from "../useCases/foods/UseGetOnlyFood"
import {
  IDeleteResponse,
  IFoodCreateResponse,
  IFoodsGetResponse,
  IHttpClient,
} from "./HttpAxiosAdapterClient"

interface IGateway {
  getAllFoods(): Promise<IFoodsGetResponse>
  getOnlyFood(input: IGetOnlyFood): Promise<any>
  createFood(input: ICreateFood): Promise<IFoodCreateResponse>
  deleteFood(input: IDeleteFood): Promise<IDeleteResponse>
}

export default class Gateway implements IGateway {
  constructor(private _httpClient: IHttpClient) {}

  async deleteFood(input: IDeleteFood): Promise<IDeleteResponse> {
    if (!input?.id) {
      return GatewayValidation.isValidDelete(input.id)
    }
    if (!input?.isConfirm) {
      return GatewayValidation.isConfirmDelete(input.isConfirm!)
    }
    const response = await this._httpClient.delete(input)
    return response
  }

  async createFood(input: ICreateFood): Promise<IFoodCreateResponse> {
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
