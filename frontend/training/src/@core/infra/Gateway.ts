import { IHttpClient } from "./HttpAxiosAdapterClient"

interface IGateway {
  getAllFoods(): Promise<any>
  getOnlyFood(input: IGetOnlyFood): Promise<any>
  createFood(input: ICreateFood): Promise<any>
  deleteFood(input: IDeleteFood): Promise<any>
}

interface IGetOnlyFood {
  id: string
}

interface ICreateFood {
  name: string
  price: number
  category: string
}

interface IDeleteFood {
  id: string
}

export default class Gateway implements IGateway {
  constructor(private _httpClient: IHttpClient) {}

  async deleteFood(input: IDeleteFood): Promise<any> {
    const response = await this._httpClient.delete(input)
    return response
  }

  async createFood(input: ICreateFood): Promise<any> {
    const response = await this._httpClient.create(input)
    return response
  }

  async getOnlyFood(input: IGetOnlyFood): Promise<any> {
    const response = await this._httpClient.getOnly(input)
    return response
  }

  async getAllFoods() {
    const response = await this._httpClient.get()
    return response
  }
}

export type { IGateway, IGetOnlyFood, ICreateFood, IDeleteFood }
