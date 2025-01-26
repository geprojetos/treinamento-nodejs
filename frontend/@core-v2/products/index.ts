import Gateway from "../infra/gateway"
import HttpClientAxiosAdapter from "../infra/httpClient/HttpClientAxiosAdapter"
import UseCaseCreateProduct from "./useCases/create"
import UseCaseDeleteProduct from "./useCases/delete"
import UseCaseEditProduct from "./useCases/edit"
import UseCaseGetAllProducts from "./useCases/get"

const baseURL = "http://localhost:3001/products"
const httpClient = HttpClientAxiosAdapter.getInstance(baseURL)
const gateway = new Gateway(httpClient)
const useCaseGetAllProduct = new UseCaseGetAllProducts(gateway)
const useCaseCreateProduct = new UseCaseCreateProduct(gateway)
const useCaseEditProduct = new UseCaseEditProduct(gateway)
const useCaseDeleteProduct = new UseCaseDeleteProduct(gateway)

export {
  useCaseCreateProduct,
  useCaseDeleteProduct,
  useCaseEditProduct,
  useCaseGetAllProduct,
}
