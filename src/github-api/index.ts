import useInitialize from "./initialize"
import useServer from "./server"

const { app } = useInitialize()
useServer(app)
