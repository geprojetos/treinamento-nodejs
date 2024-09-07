import axios from "axios"

interface IHttpClient {
  get(url: string): Promise<any>
}

const useAxiosAdapter = (): IHttpClient => {
  const get = async (url: string) => {
    const { data } = await axios.get(`${url}`)
    return data
  }

  return {
    get,
  }
}

export default useAxiosAdapter
export type { IHttpClient }
