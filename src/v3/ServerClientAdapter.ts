import IServerClientV3 from "./IServerClient"
import express, { Express, Request, Response } from "express"

interface AdapterRequest extends Request {}
interface AdapterResponse extends Response {}

export default class ServerClientAdapterV3 implements IServerClientV3 {
  readonly app: Express

  constructor() {
    this.app = express()
  }

  get(
    url: string,
    callback: (req: AdapterRequest, res: AdapterResponse) => Promise<any>
  ): void {
    this.app.get(url, async (req: AdapterRequest, res: AdapterResponse) => {
      const output = await callback(req, res)
      res.json(output)
    })
  }

  listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server is running http://localhost:${port}`)
    )
  }
}

export { AdapterRequest, AdapterResponse }
