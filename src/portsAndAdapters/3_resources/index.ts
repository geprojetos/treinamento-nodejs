import { IHttpClient } from "./HttpClientAxiosAdapter"

interface IDatabase {
  getFoodsResources(): Promise<any>
}

class DatabaseProduction implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}
  async getFoodsResources() {
    const response = await this._httpClient.get("http://localhost:3000/example")
    return response.data
  }
}

class DatabaseFake implements IDatabase {
  constructor(private _httpClient: IHttpClient) {}

  async getFoodsResources() {
    return [
      { id: "1", name: "Macarronada", price: 12.5, category: "snack" },
      { id: "2", name: "File de frango", price: 10, category: "snack" },
      { id: "3", name: "Sorvete", price: 20, category: "dessert" },
    ]
  }
}

export default DatabaseProduction
export { DatabaseFake }
export type { IDatabase }
