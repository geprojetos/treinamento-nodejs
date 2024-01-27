import IFoodDTOV7 from "./IFoodsDTO"
import IHttpClientV7 from "./IHttpClient"
import axios from "axios"

export default class HttpClientAxiosAdapterV7 implements IHttpClientV7 {
  constructor(private _baseUrl: string) {}

  async get(): Promise<IFoodDTOV7[]> {
    const response = await axios.get(this._baseUrl)
    return response.data
  }
}
