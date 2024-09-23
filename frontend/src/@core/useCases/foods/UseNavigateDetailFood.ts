interface IUseNavigateDetailFood {
  params: IUseNavigateDetailFoodParams
  callback: (params: IUseNavigateDetailFoodParams) => void
}

interface IUseNavigateDetailFoodParams {
  id: string
  name: string
  price: number
  category: string
}

export default class UseNavigateDetailFood {
  execute(input: IUseNavigateDetailFood) {
    input.callback(input.params)
  }
}

export type { IUseNavigateDetailFood, IUseNavigateDetailFoodParams }
