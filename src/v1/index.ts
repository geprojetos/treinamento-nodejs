import HttpServerAdapter from "./HttpServerAdapter"
import { Request, Response } from "./HttpServer"
import DataBaseJsonServer from "./DatabaseJsonServer"
import FoodRepository from "./FoodRepository"
const port = 3001

const httpServer = new HttpServerAdapter()

httpServer.get("/foods", async (req: Request, res: Response) => {
  const database = new DataBaseJsonServer()
  const foodRepository = new FoodRepository(database)
  const output = await foodRepository.get()
  return output
})

httpServer.listen(port)
