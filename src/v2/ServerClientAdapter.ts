import IServerClientV2 from "./ServerClient"
import express, { Express } from "express"

export default class ServerClientExpressAdapter implements IServerClientV2 {
  readonly app: Express

  constructor() {
    this.app = express()
  }

  get(url: string, callback: (req: any, res: any) => Promise<any>): void {
    this.app.get(url, async (req, res) => {
      const output = await callback(req, res)
      res.json(output.output)
    })
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running http://localhost:${port}`)
    })
  }
}
