import { IGetAllProductsResponse } from "../../../test/inMemory/InMemoryProduct"

interface ProductError {
  status: number
  message: string
}

interface IProducts {
  id?: string
  name: string
  description: string
  price: number
  category: string
}

export default class Product {
  readonly id: string
  private _error?: ProductError
  static _deleteError?: ProductError

  constructor(
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly category: string
  ) {
    this.id = String(Math.floor(Math.random() * 9999))
    this._validation()
  }

  private _validation() {
    if (!this.name) {
      this._error = {
        status: 400,
        message: "Name is required",
      }
      return
    }

    if (!this.description) {
      this._error = {
        status: 400,
        message: "Description is required",
      }
      return
    }

    if (!this.price || this.price === 0) {
      this._error = {
        status: 400,
        message: "Price is required",
      }
      return
    }

    if (!this.category) {
      this._error = {
        status: 400,
        message: "Category is required",
      }
      return
    }
    this._error = undefined
  }

  public isInvalidToEdit(input: IGetAllProductsResponse, id: string) {
    const isNotFound =
      input.data.filter((product) => product.id === id).length === 0
    if (isNotFound) {
      this._error = {
        status: 400,
        message: "Product not found",
      }
      return true
    }
    this._error = undefined
  }

  static isInvalidToDelete(input: IGetAllProductsResponse, id: string) {
    const isNotFound =
      input.data.filter((product) => product.id === id).length === 0
    if (isNotFound) {
      this._deleteError = {
        status: 400,
        message: "Product not found",
      }
      return true
    }
    this._deleteError = undefined
  }

  get error() {
    return this._error
  }
}

export type { IProducts }
