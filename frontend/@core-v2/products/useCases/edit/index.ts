import { IGateway } from "../../../infra/gateway"
import {
  ICreateProductResponse,
  IErrorCreateProductResponse,
  IGetAllProductsResponse,
} from "../../../test/inMemory/InMemoryProduct"
import Product, { IProducts } from "../../domain/product"

export default class UseCaseEditProduct {
  constructor(private _gateway: IGateway) {}

  async execute(
    input: IProducts
  ): Promise<ICreateProductResponse | IErrorCreateProductResponse> {
    const product = new Product(
      input.name,
      input.description,
      input.price,
      input.category
    )
    const productList: IGetAllProductsResponse = await this._gateway.getAll()
    if (product.isInvalidToEdit(productList, input.id!)) {
      return product.error!
    }
    return await this._gateway.patch(input)
  }
}
