import { IFoodCreateResponse } from "src/foods/3_resources/adapters/HttpClientAxiosAdapter"

interface IMessage {
  status: string
  message: string
  data?: IFoodCreateResponse
}

export default class CreateFood {
  error: IMessage = {
    status: "",
    message: "",
  }

  constructor(
    private _name: string,
    private _price: number,
    private _category: string
  ) {
    this._initialize()
  }

  private _initialize() {
    if (!this._name) {
      return this._requiredName()
    }

    if (!this._price) {
      return this._requiredPrice()
    }

    if (!this._category) {
      return this._requiredCategory()
    }

    this.error = {
      message: "",
      status: "",
    }
  }

  private _requiredName() {
    this.error = {
      message: "Name is required",
      status: "400",
    }
  }

  private _requiredPrice() {
    this.error = {
      message: "Price is required",
      status: "400",
    }
  }

  private _requiredCategory() {
    this.error = {
      message: "Category is required",
      status: "400",
    }
  }
}
