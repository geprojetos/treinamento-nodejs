import axios from "axios"

interface IDatabase {
  getFoodsResources(): Promise<any>
}

class GetFoodsResourcesProduction implements IDatabase {
  async getFoodsResources(): Promise<any> {
    const response = await axios.get("http://localhost:3000/example")
    return response.data
  }
}

class GetFoodsResourcesFake implements IDatabase {
  async getFoodsResources(): Promise<any> {
    return [
      { id: "1", name: "Macarronada", price: 12.5, category: "snack" },
      { id: "2", name: "File de frango", price: 10, category: "snack" },
      { id: "3", name: "Sorvete", price: 20, category: "dessert" },
    ]
  }
}

export default GetFoodsResourcesProduction
export type { IDatabase }
export { GetFoodsResourcesFake }
