import { IDeleteResponse } from "src/foods/3_resources/adapters/HttpClientAxiosAdapter"

export default class DeleteFood {
  error: IDeleteResponse = {
    message: "",
    status: "",
  }
  constructor(private _id: string) {
    this._initialize()
  }

  private _initialize() {
    if (!this._id) {
      this.error = {
        message: "ID is required",
        status: "400",
      }
    }
  }
}
