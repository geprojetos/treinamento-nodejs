import IDatabase from "./Database"
import { IFoods } from "./Food"
import HttpClientAdapter from "./HttpClientAdapter"

export default class DataBaseJsonServer implements IDatabase {
  async getFoods(): Promise<IFoods[]> {
    const httpClientAdapter = new HttpClientAdapter()
    const output = await httpClientAdapter.get("http://localhost:3000/foods")
    return output.data
  }
}
