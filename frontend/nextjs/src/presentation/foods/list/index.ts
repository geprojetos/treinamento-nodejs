import { useEffect, useState } from "react"
import {
  useGetAllFoods,
  useNavigateDetailFood,
  useDeleteFood,
} from "@core/index"
import { IFoodsGetResponse } from "@core/infra/HttpAxiosAdapterClient"
import { useRouter } from "next/router"
import {
  IUseNavigateDetailFood,
  IUseNavigateDetailFoodParams,
} from "@core/useCases/foods/UseNavigateDetailFood"

const useGetAllPresentation = () => {
  const { push } = useRouter()
  const [foods, setFoods] = useState<IFoodsGetResponse>()

  useEffect(() => {
    _initialize()
  }, [])

  const _initialize = async () => {
    const response: IFoodsGetResponse = await useGetAllFoods.execute()
    setFoods(response)
  }

  const navigateToDetail = (params: IUseNavigateDetailFoodParams) => {
    const input: IUseNavigateDetailFood = {
      params,
      callback: () => {
        push({
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
    push({
      pathname: "create",
    })
  }

  const handleRemove = async (id: string) => {
    const isConfirm = confirm("Deseja remover?")
    if (isConfirm) {
      await useDeleteFood.execute({
        id,
        callback: () => _initialize(),
        isConfirm,
      })
    }
  }

  return {
    foods,
    navigateToDetail,
    navigateToCreate,
    handleRemove,
  }
}

export default useGetAllPresentation
