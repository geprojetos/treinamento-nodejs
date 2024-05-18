import { Request, Response } from "express"
import useGithubModel from "./model"
import useRepository from "./repository"
import useAxiosAdapter from "./httpClient"

const useGithubController = () => {
  const { get } = useAxiosAdapter()
  const { getUserInformationAPI, getUserRepositoriesAPI } = useRepository({
    get,
  })

  const getUserInformation = async (req: Request, res: Response) => {
    const { params } = req
    const input = params?.userName
    const { getUserInformation } = useGithubModel({
      getUserInformationAPI,
      getUserRepositoriesAPI,
    })
    const output = await getUserInformation({ input })
    res.status(200).json(output)
  }

  const getUserRepositories = async (req: Request, res: Response) => {
    const { params } = req
    const input = params?.userName
    const { getUserRepositories } = useGithubModel({
      getUserInformationAPI,
      getUserRepositoriesAPI,
    })
    const output = await getUserRepositories({ input })
    res.status(200).json(output)
  }

  return {
    getUserInformation,
    getUserRepositories,
  }
}

export default useGithubController
