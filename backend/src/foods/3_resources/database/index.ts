import { IHttpClient } from "../adapters/HttpClientAxiosAdapter"
import LoggerPinoAdapter from "../adapters/LoggerPinoAdapter"

interface IFoodsGetAllResponse {
  status: string
  message: string
  data: IFood[]
}

interface IFood {
  id: string
  name: string
  price: number
  category: string
}

interface IFoodCreateResponse {
  status: string
  message: string
  data: Partial<IFood[]>
}

interface IDeleteResponse {
  message: string
  status: string
}

export interface IDatabase {
  getFoods(): Promise<IFoodsGetAllResponse>
  createFood(input: any): Promise<IFoodCreateResponse>
  deleteFood(input: any): Promise<IDeleteResponse>
}

class FoodsDatabase implements IDatabase {
  private _loggerPinoAdapter: LoggerPinoAdapter

  constructor(private _httpClient: IHttpClient) {
    this._loggerPinoAdapter = new LoggerPinoAdapter()
  }

  async deleteFood(input: any): Promise<IDeleteResponse> {
    try {
      this._loggerPinoAdapter.info(`FoodsDatabase - Delete food ${input}`)
      const response = await this._httpClient.delete(input)
      return {
        status: String(response.status),
        message: response.message,
      }
    } catch (error) {
      this._loggerPinoAdapter.info(
        `FoodsDatabase - Error delete food ${error.message}`
      )
    }
  }

  async createFood(input: any): Promise<IFoodCreateResponse> {
    try {
      this._loggerPinoAdapter.info(`FoodsDatabase - Create food ${input}`)
      const response = await this._httpClient.post(input)
      return {
        status: String(response.status),
        message: response.message,
        data: response.data,
      }
    } catch (error) {
      this._loggerPinoAdapter.info(
        `FoodsDatabase - Error create food ${error.message}`
      )
    }
  }

  async getFoods(): Promise<IFoodsGetAllResponse> {
    try {
      this._loggerPinoAdapter.info(`FoodsDatabase - get food`)
      const response = await this._httpClient.get()
      return {
        status: String(response.status),
        message: response.message,
        data: response.data,
      }
    } catch (error) {
      this._loggerPinoAdapter.info(
        `FoodsDatabase - Error get food ${error.message}`
      )
    }
  }
}

export default FoodsDatabase
export type {
  IFoodsGetAllResponse,
  IFood,
  IFoodCreateResponse,
  IDeleteResponse,
}
