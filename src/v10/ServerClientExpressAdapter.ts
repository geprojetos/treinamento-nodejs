import IServerClient from "./IServerClient"
import express, { Express, Request, Response } from "express"

export default class ServerClientExpressAdapter implements IServerClient {
  private _app: Express

  constructor() {
    this._app = express()
  }

  get(url: string, callback: (req: Request, res: Response) => void): void {
    this._app.get(url, async (req, res) => {
      try {
        const output = await callback(req, res)
        return res.json(output)
      } catch (error) {
        console.log("Deu ruim :(", error)
      }
    })
  }
  listen(port: number, callback: () => void): void {
    this._app.listen(port, () => callback())
  }
}
