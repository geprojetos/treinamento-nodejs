import { Express } from "express"
const port = 3000

const useServer = (app: Express) => {
  app.listen(port, () =>
    console.log(`Server is running http://localhost:${port}`)
  )
}

export default useServer
