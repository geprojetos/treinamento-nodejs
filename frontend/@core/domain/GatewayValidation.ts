import { IDeleteResponse } from "../infra/HttpAxiosAdapterClient"

export default class GatewayValidation {
  static isValidDelete(id: string): IDeleteResponse {
    if (!id) {
      return {
        status: "400",
        message: "ID is required",
      }
    }

    return {
      status: "",
      message: "",
    }
  }

  static isConfirmDelete(isConfirm: boolean): IDeleteResponse {
    if (!isConfirm) {
      return {
        status: "400",
        message: "Is pending confirm",
      }
    }

    return {
      status: "",
      message: "",
    }
  }
}
