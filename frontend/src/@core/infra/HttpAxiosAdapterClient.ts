import axios from "axios"
import { IGetOnlyFood } from "../useCases/foods/UseGetOnlyFood"
import { ICreateFood } from "../useCases/foods/UseCreateFood"
import { IDeleteFood } from "../useCases/foods/UseDeleteFood"

export interface IHttpClient {
  get(): Promise<any>
  getOnly(input: IGetOnlyFood): Promise<any>
  create(input: ICreateFood): Promise<any>
  delete(input: IDeleteFood): Promise<any>
}

export default class HttpClientAxiosAdapter implements IHttpClient {
  constructor(private _baseUrl: string) {
    this._baseUrl = _baseUrl
  }

  async delete(input: IDeleteFood): Promise<any> {
    const response = await axios.delete(`${this._baseUrl}/?id=${input.id}`)
    return response.data
  }

  async create(input: ICreateFood): Promise<any> {
    const response = await axios.post(`${this._baseUrl}`, input)
    return response.data
  }

  async getOnly(input: IGetOnlyFood): Promise<any> {
    const response = await axios.get(`${this._baseUrl}/${input.id}`)
    return response.data
  }

  async get(): Promise<any> {
    const response = await axios.get(this._baseUrl)
    return response.data
  }
}
