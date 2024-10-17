import axios from "axios"
import { IGetOnlyFood } from "../useCases/foods/UseGetOnlyFood"
import { ICreateFood } from "../useCases/foods/UseCreateFood"
import { IDeleteFood } from "../useCases/foods/UseDeleteFood"
import { IFood } from "../domain/Food"

interface IHttpClient {
  get(): Promise<IFoodsGetResponse>
  getOnly(input: IGetOnlyFood): Promise<any>
  create(input: ICreateFood): Promise<IFoodCreateResponse>
  delete(input: IDeleteFood): Promise<any>
}

interface IFoodsGetResponse {
  status: string
  message: string
  data: IFoodResponse[]
}

interface IFoodResponse {
  id: string
  name: string
  price: number
  category: string
}

interface IFoodCreateResponse {
  status: string
  message: string
  data?: Partial<IFood[]>
  error?: Partial<IFoodError>
}

interface IFoodError {
  name: string
  price: string
  category: string
}

export default class HttpClientAxiosAdapter implements IHttpClient {
  constructor(private _baseUrl: string) {
    this._baseUrl = _baseUrl
  }

  async delete(input: IDeleteFood): Promise<any> {
    const response = await axios.delete(`${this._baseUrl}/?id=${input.id}`)
    return response.data
  }

  async create(input: ICreateFood): Promise<IFoodCreateResponse> {
    const response = await axios.post<IFoodCreateResponse>(
      `${this._baseUrl}`,
      input
    )
    return response.data
  }

  async getOnly(input: IGetOnlyFood): Promise<any> {
    const response = await axios.get(`${this._baseUrl}/${input.id}`)
    return response.data
  }

  async get(): Promise<IFoodsGetResponse> {
    const response = await axios.get<IFoodsGetResponse>(this._baseUrl)
    return response.data
  }
}

export type {
  IHttpClient,
  IFoodsGetResponse,
  IFoodResponse,
  IFoodCreateResponse,
}
