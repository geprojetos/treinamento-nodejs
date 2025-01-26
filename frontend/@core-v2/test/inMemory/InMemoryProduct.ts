import { IGateway } from "../../infra/gateway"
import { IProducts } from "../../products/domain/product"

interface ICreateProductResponse {
  status: number
  data: IProducts
}

interface IErrorCreateProductResponse {
  status: number
  message: string
}

interface IGetAllProductsResponse {
  status: number
  data: IProducts[]
}

interface IGetEditProductResponse {
  status: number
  data: IProducts
}

interface IDeleteProductResponse {
  status: number
}

export default class InMemoryProduct implements IGateway {
  private _products: IProducts[]

  constructor() {
    this._products = []
  }

  async delete(input: string): Promise<IDeleteProductResponse> {
    const newList = this._products.filter((product) => product.id !== input)
    this._products = newList
    return {
      status: 200,
    }
  }

  async patch(input: IProducts): Promise<IGetEditProductResponse> {
    const index = this._products.findIndex((product) => product.id === input.id)
    this._products[index] = input
    return {
      status: 201,
      data: this._products[index],
    }
  }

  async create(input: IProducts): Promise<ICreateProductResponse> {
    this._products.push(input)
    return {
      status: 201,
      data: input,
    }
  }

  async getAll(): Promise<IGetAllProductsResponse> {
    return {
      status: 200,
      data: this._products,
    }
  }
}

export type {
  ICreateProductResponse,
  IErrorCreateProductResponse,
  IGetAllProductsResponse,
  IGetEditProductResponse,
  IDeleteProductResponse,
}
