import { IHttpClient } from "./httpClient"

const useRepository = ({ get }: IHttpClient) => {
  const getUserInformationAPI = async (userName: string) => {
    const response = await get(`https://api.github.com/users/${userName}`)
    return response
  }

  const getUserRepositoriesAPI = async (userName: string) => {
    const response = await get(`https://api.github.com/users/${userName}/repos`)
    return response
  }

  return {
    getUserInformationAPI,
    getUserRepositoriesAPI,
  }
}

export default useRepository
