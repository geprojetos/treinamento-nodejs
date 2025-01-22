import { IHttpClient } from "src/products/infra/httpClient/HttpClientAxiosAdapter"
import { IProducts } from "src/products/infra/gateway"

class HttpClientInMemory implements IHttpClient {
  products: IProducts[]

  constructor() {
    this.products = []
  }

  async post(input: any): Promise<{
    status: number
    data: any
  }> {
    this.products.push(input)
    return {
      status: 201,
      data: input,
    }
  }

  async get(): Promise<{
    status: number
    data: any
  }> {
    return {
      status: 200,
      data: this.products,
    }
  }

  async patch(input: IProducts): Promise<{
    status: number
    data: any
  }> {
    const isExisting = this.products.findIndex(
      (product) => product.id === input.id
    )
    if (isExisting === -1) {
      return {
        status: 400,
        data: "Not found",
      }
    }
    this.products[isExisting] = {
      ...input,
    }
    return {
      status: 201,
      data: this.products[isExisting],
    }
  }

  async delete(id: string): Promise<{
    status: number
  }> {
    const isExisting = this.products.findIndex((product) => product.id === id)
    if (isExisting === -1) {
      return {
        status: 400,
      }
    }
    const newList = this.products.filter((product) => product.id !== id)
    this.products = newList
    return {
      status: 200,
    }
  }
}

export default HttpClientInMemory
