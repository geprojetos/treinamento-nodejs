import { IGateway } from "../../../infra/gateway"
import {
  ICreateProductResponse,
  IErrorCreateProductResponse,
} from "../../../test/inMemory/InMemoryProduct"
import Product, { IProducts } from "../../domain/product"

export default class UseCaseCreateProduct {
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
    if (product.error?.message) {
      return product.error
    }
    return await this._gateway.create(input)
  }
}
