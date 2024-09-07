import express from "express"
import useRoutes from "./routes"

const useInitialize = () => {
  const app = express()
  const router = express.Router()

  app.use(router)
  useRoutes({ router })

  return {
    app,
  }
}

export default useInitialize
