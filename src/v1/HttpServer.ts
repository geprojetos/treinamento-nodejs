import { Request, Response } from "express"

interface IHttpServer {
  get(
    url: string,
    callback: (req: Request, res: Response) => Promise<any>
  ): void
  listen(port: number)
}

export default IHttpServer
export { Request, Response }
