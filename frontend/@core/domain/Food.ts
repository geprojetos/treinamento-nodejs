import { IFoodCreateResponse } from "../infra/HttpAxiosAdapterClient"

interface IFood {
  id?: string
  name: string
  price: number
  category: string
}

export default class Food {
  public error: IFoodCreateResponse
  private _name: string
  private _price: number
  private _category: string

  constructor(input: IFood) {
    this._name = input.name
    this._price = input.price
    this._category = input.category
    this.error = {
      status: "",
      message: "",
      error: {
        name: "",
        price: "",
        category: "",
      },
    }
    this._validate()
  }

  private _validate() {
    this._isValidName()
    this._isValidPrice()
    this._isValidCategory()
  }

  private _isValidName() {
    if (!this._name) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          name: "Name is required",
        },
      }
    }
    if (this._name) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          name: "",
        },
      }
    }
  }

  private _isValidPrice() {
    if (!this._price) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          price: "Price is required",
        },
      }
    }
    if (this._price) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          price: "",
        },
      }
    }
  }

  private _isValidCategory() {
    if (!this._category) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          category: "Category is required",
        },
      }
    }
    if (this._category) {
      this.error = {
        ...this.error,
        error: {
          ...this.error.error,
          category: "",
        },
      }
    }
  }

  isInValid(): boolean {
    return (
      !!this.error.error?.name?.length ||
      !!this.error.error?.price?.length ||
      !!this.error.error?.category?.length
    )
  }
}

export type { IFood }
