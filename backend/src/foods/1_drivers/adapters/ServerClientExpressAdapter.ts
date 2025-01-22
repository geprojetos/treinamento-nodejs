import express, { Express, NextFunction, Request, Response } from "express"
import cors from "cors"
import { verify } from "jsonwebtoken"
import config from "../../config"

interface IServerClient {
  get(url: string, callback: (req: any, res: any) => Promise<any>): void
  post(url: string, callback: (req: any, res: any) => Promise<any>): void
  delete(url: string, callback: (req: any, res: any) => Promise<any>): void
  listen(port: number, callback: () => void): void
}

class ServerClientExpressAdapter implements IServerClient {
  app: Express
  static instance: ServerClientExpressAdapter

  private constructor() {
    this.app = express()
    this._middlewares()
  }

  private _middlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use("/foods", this._validationToken)
  }

  private _validationToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (request.headers["authorization"]) {
      const token = request.headers["authorization"].split(" ")[1]
      verify(token, config.secretToken, function (error, _decoded) {
        if (config.isEnableTokenValidation && error) {
          response.json({
            status: "401",
            message: "Invalid token",
          })
        }
      })
    }
    next()
  }

  delete(url: string, callback: (req: any, res: any) => Promise<any>): void {
    try {
      this.app.delete(url, async (req, res) => {
        const output = await callback(req, req)
        res.json(output)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  post(url: string, callback: (req: any, res: any) => Promise<any>): void {
    this.app.post(url, async (req, res) => {
      const output = await callback(req, req)
      res.json(output)
    })
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
