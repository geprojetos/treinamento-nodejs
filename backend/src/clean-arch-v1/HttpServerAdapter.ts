import IHttpServer from "./HttpServer"
import express, { Express, Request, Response } from "express"

class HttpServerAdapter implements IHttpServer {
  private _app: Express

  constructor() {
    this._app = express()
  }

  get(url: string, callback: Function): void {
    this._app.get(url, async (req: Request, res: Response) => {
      const output = await callback(req, res)
      res.json(output)
    })
  }

  listen(port: number) {
    return this._app.listen(port, () =>
      console.log(`Server is running http://localhost:${port}`)
    )
  }
}

export default HttpServerAdapter
