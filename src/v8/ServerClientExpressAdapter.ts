import IServerClientV8 from "./IServerClient"
import express, { Express } from "express"

export default class ServerClientExpressAdapterV8 implements IServerClientV8 {
  private _app: Express

  constructor() {
    this._app = express()
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
