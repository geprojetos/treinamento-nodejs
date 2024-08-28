import express, { Express } from "express"

interface ServerClient {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen(port: number, callback: () => void): void
}

class ServerClientExpressAdapter implements ServerClient {
  _app: Express
  static #instance: ServerClientExpressAdapter

  constructor() {
    this._app = express()
  }
  get(url: string, callback: (req: any, res: any) => Promise<any>): void {
    this._app.get(url, async (req, res) => {
      const output = await callback(req, res)
      res.json(output)
    })
  }
  listen(port: number, callback: () => void) {
    this._app.listen(port, callback)
  }

  public static getIinstance(): ServerClientExpressAdapter {
    if (!ServerClientExpressAdapter.#instance) {
      ServerClientExpressAdapter.#instance = new ServerClientExpressAdapter()
    }
    return ServerClientExpressAdapter.#instance
  }
}

export default ServerClientExpressAdapter
