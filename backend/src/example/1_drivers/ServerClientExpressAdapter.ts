import express, { Express } from "express"

interface IServerClient {
  get(
    url: string,
    callback: (request: any, response: any) => Promise<void>
  ): void
  listen(port: number, callback: () => void): void
}

class ServerClientExpressAdapter implements IServerClient {
  public app: Express

  constructor() {
    this.app = express()
  }

  get(
    url: string,
    callback: (request: any, response: any) => Promise<void>
  ): void {
    this.app.get(url, async (req, res) => {
      const output = await callback(req, res)
      res.json(output)
    })
  }
  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback)
  }
}

export default ServerClientExpressAdapter
export type { IServerClient }
