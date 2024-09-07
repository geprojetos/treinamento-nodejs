import { Router } from "express"
import useGithubController from "./controllers"

interface IUseRoutes {
  router: Router
}

const useRoutes = ({ router }: IUseRoutes) => {
  const { getUserInformation, getUserRepositories } = useGithubController()
  router.get("/users/:userName", getUserInformation)
  router.get("/users/:userName/repos", getUserRepositories)
}

export default useRoutes
