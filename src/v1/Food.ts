interface IFoods {
  id?: string
  name: string
  price: number
}

interface IFoodRepository {
  get(): Promise<IFoods[]>
}

export default IFoodRepository
export { IFoods }
