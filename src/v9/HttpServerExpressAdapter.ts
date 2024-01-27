import IHttpServer from "./IHttpServer"
import express, { Express } from "express"

export default class HttpServerExpressAdapter implements IHttpServer {
  private _app: Express

  constructor() {
    this._app = express()
  }

  get(url: string, callback: (req: any, res: any) => void): void {
    this._app.get(url, async (req, res) => {
      try {
        const output = await callback(req, res)
        return res.json(output)
      } catch (error) {
        console.log(error)
      }
    })
  }
  listen(port: number, callback: () => void): void {
    this._app.listen(port, () => callback())
  }
}
