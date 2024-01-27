import IFoodsDTOV7 from "./IFoodsDTO"
import IHttpClientV8 from "./IHttpClient"
import axios from "axios"

export default class HttpClientAxiosAdapterV7 implements IHttpClientV8 {
  constructor(private _baseUrl: string) {}
  async get(): Promise<IFoodsDTOV7[]> {
    const output = await axios.get(this._baseUrl)
    return output.data
  }
}
