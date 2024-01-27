import IServerClientV5 from "../../adapters/gateways/IServerClient"
import { createServer, Server } from "restify"

export default class ServerClientRestifyAdapterV5 implements IServerClientV5 {
  private _app: Server

  constructor() {
    this._app = createServer()
  }

  get(url: string, callback: (req: any, res: any) => Promise<void>): void {
    this._app.get(url, async (req, res) => {
      const output = await callback(req, res)
      return output
    })
  }

  listen(port: number): void {
    this._app.listen(port, () =>
      console.log(`Server is running http://localhost:${port}`)
    )
  }
}
