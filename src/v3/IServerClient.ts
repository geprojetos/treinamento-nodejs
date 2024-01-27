import { AdapterRequest, AdapterResponse } from "./ServerClientAdapter"

export default interface IServerClientV3 {
  get(
    url: string,
    callback: (req: AdapterRequest, res: AdapterResponse) => Promise<any>
  ): void
  listen(port: number): void
}
