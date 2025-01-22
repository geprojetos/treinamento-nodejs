import { IProducts } from "../../infra/gateway"

interface IProductError {
  status: number
  message: string
}

class EntityProduct {
  private _error: IProductError
  private _product: IProducts

  constructor(
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly category: string
  ) {
    this._initialize()
  }

  private _initialize() {
    this._initProduct()
    this._validation()
  }

  private _initProduct() {
    this._product = {
      id: String(Math.floor(Math.random() * 9999)),
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
    }
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

    if (this.price < 0) {
      this._error = {
        status: 400,
        message: "Invalid price",
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

    this._error = {
      status: 0,
      message: "",
    }
  }

  public get product() {
    return this._product
  }

  public get error() {
    return this._error
  }

  public static isInvalidToPatch(id: string, data: IProducts[]) {
    const isNotFound =
      data.filter((product) => String(product.id) === String(id)).length === 0
    if (isNotFound) {
      return {
        status: 400,
        message: "Not found product",
      }
    }
  }

  public static isInvalidToDelete(id: string, data: IProducts[]) {
    const isNotFound =
      data.filter((product: any) => String(product.id) === String(id))
        .length === 0
    if (isNotFound) {
      return {
        status: 400,
        message: "Invalid parameters",
      }
    }
  }
}

export default EntityProduct
