import IDatabase from "./IDatabase"
import IHttpClientV5 from "./IHttpClient"

export default class DatabaseJSONServerAdapter implements IDatabase {
  constructor(private _httpClient: IHttpClientV5) {}

  async get(): Promise<any> {
    const output = await this._httpClient.get()
    return output.data
  }
}
