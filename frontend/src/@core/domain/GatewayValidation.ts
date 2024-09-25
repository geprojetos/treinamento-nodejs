export default class GatewayValidation {
  static isValidDelete(id: string) {
    if (!id) {
      return {
        message: "ID is required",
      }
    }
  }

  static isConfirmDelete(isConfirm: boolean) {
    if (!isConfirm) {
      return {
        message: "Is pending confirm",
      }
    }
  }
}
