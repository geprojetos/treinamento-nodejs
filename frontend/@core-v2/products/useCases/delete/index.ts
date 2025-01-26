import { IGateway } from "../../../infra/gateway"
import { IGetAllProductsResponse } from "../../../test/inMemory/InMemoryProduct"
import Product from "../../domain/product"

export default class UseCaseDeleteProduct {
  constructor(private _gateway: IGateway) {}

  async execute(input: string) {
    const productList: IGetAllProductsResponse = await this._gateway.getAll()
    if (Product.isInvalidToDelete(productList, input)) {
      return Product._deleteError
    }
    return await this._gateway.delete(input)
  }
}
