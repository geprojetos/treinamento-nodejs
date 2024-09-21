import { useEffect, useState } from "react"
import { useGetAllFoods, useNavigateDetailFood } from "../../@core/index"
import { IFood } from "../../@core/domain/Food"
import { useRouter } from "next/router"
import {
  IUseNavigateDetailFood,
  IUseNavigateDetailFoodParams,
} from "../../@core/useCases/foods/UseNavigateDetailFood"

const useGetAll = () => {
  const router = useRouter()
  const [foods, setFoods] = useState<IFood[]>([])

  useEffect(() => {
    _initialize()
  }, [])

  const _initialize = async () => {
    const response: IFood[] = await useGetAllFoods.execute()
    setFoods(response)
  }

  const navigateToDetail = (params: IUseNavigateDetailFoodParams) => {
    const input: IUseNavigateDetailFood = {
      params,
      callback: () => {
        router.push({
          pathname: "details",
          query: JSON.stringify(params),
        })
      },
    }
    useNavigateDetailFood.execute(input)
  }

  return {
    foods,
    navigateToDetail,
  }
}

export default useGetAll
