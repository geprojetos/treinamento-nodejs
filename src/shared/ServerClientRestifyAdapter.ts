import { createServer, Server } from "restify"

interface IServerClient {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen: (port: number, callback: () => void) => void
}

export default class ServerClientRestifyAdapter implements IServerClient {
  private _app: Server

  constructor() {
    this._app = createServer()
  }

  get(url: string, callback: (req: any, res: any) => Promise<void>): void {
    this._app.get(url, async (req, res) => {
      const output = await callback(req, res)
      return res.send(output)
    })
  }

  listen(port: number, callback: () => void): void {
    this._app.listen(port, () => callback())
  }
}
