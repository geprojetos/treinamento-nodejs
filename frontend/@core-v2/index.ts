import {
  useCaseCreateProduct,
  useCaseDeleteProduct,
  useCaseEditProduct,
  useCaseGetAllProduct,
} from "./products"
import { IProducts } from "./products/domain/product"
import {
  ICreateProductResponse,
  IDeleteProductResponse,
  IErrorCreateProductResponse,
  IGetAllProductsResponse,
  IGetEditProductResponse,
} from "./test/inMemory/InMemoryProduct"

export {
  useCaseCreateProduct,
  useCaseDeleteProduct,
  useCaseEditProduct,
  useCaseGetAllProduct,
  IProducts,
  ICreateProductResponse,
  IErrorCreateProductResponse,
  IGetAllProductsResponse,
  IGetEditProductResponse,
  IDeleteProductResponse,
}
