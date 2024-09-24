import { useEffect, useState } from "react"
import { useGetAllFoods, useNavigateDetailFood } from "../../../@core/index"
import { IFood } from "../../../@core/domain/Food"
import { useRouter } from "next/router"
import {
  IUseNavigateDetailFood,
  IUseNavigateDetailFoodParams,
} from "../../../@core/useCases/foods/UseNavigateDetailFood"

const useGetAllPresentation = () => {
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
          query: {
            ...params,
          },
        })
      },
    }
    useNavigateDetailFood.execute(input)
  }

  const navigateToCreate = () => {
    router.push({
      pathname: "create",
    })
  }

  return {
    foods,
    navigateToDetail,
    navigateToCreate,
  }
}

export default useGetAllPresentation
