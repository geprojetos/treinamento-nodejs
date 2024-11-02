import { IFoodsGetAllResponse } from "../../3_resources/database"

interface IGetFoodTransform {
  response: IFoodsGetAllResponse
  category: string
}

interface IGetCategory {
  response: IFoodsGetAllResponse
  category: string
  output: IOutPut[]
}

interface IOutPut {
  price: number
  id: string
  name: string
  category: string
}

enum Category {
  MAIN = "main",
  SECONDARY = "secondary",
}

export default class GetFood {
  transform({ response, category }: IGetFoodTransform) {
    const output = response.data.map((food) => ({
      ...food,
      price: this._calculatePercentage(food.price),
    }))

    if (this._getCategoryName(category).isMain) {
      return this._getCategory({ category, output, response })
    }

    if (this._getCategoryName(category).isSecondary) {
      return this._getCategory({ category, output, response })
    }

    return {
      status: response.status,
      message: response.message,
      data: output,
    }
  }

  private _calculatePercentage(price: number) {
    return (10 * price) / 100 + price
  }

  private _getCategoryName(category: string) {
    const isMain = category === Category.MAIN
    const isSecondary = category === Category.SECONDARY

    return {
      isMain,
      isSecondary,
    }
  }

  private _getCategory({ response, category, output }: IGetCategory) {
    return {
      status: response.status,
      message: response.message,
      data: output.filter((food) => food.category === category),
    }
  }
}
