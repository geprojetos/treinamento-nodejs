import express, { Express } from "express"

interface IServerClient {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen(port: number, callback: () => void): void
}

class ServerClientExpressAdapter implements IServerClient {
  app: Express
  static instance: ServerClientExpressAdapter

  private constructor() {
    this.app = express()
  }

  get(url: string, callback: (req: any, res: any) => Promise<any>): void {
    this.app.get(url, async (req, res) => {
      const output = await callback(req, req)
      res.json(output)
    })
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback)
  }

  public static getInstance(): ServerClientExpressAdapter {
    if (!ServerClientExpressAdapter.instance) {
      ServerClientExpressAdapter.instance = new ServerClientExpressAdapter()
    }
    return ServerClientExpressAdapter.instance
  }
}

export default ServerClientExpressAdapter
export type { IServerClient }
