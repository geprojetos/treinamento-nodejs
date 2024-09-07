import IServerClient from "./IServerClient"
import express, { Express } from "express"

export default class ServerClientExpressAdapter implements IServerClient {
  private _app: Express
  constructor() {
    this._app = express()
  }

  get(url: string, callback: (req: any, res: any) => void): void {
    this._app.get(url, async (req, res) => {
      const output = await callback(req, res)
      res.json(output)
    })
  }

  listen(port: number, callback: () => void): void {
    this._app.listen(port, () => callback())
  }
}
