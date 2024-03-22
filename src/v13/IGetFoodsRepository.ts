interface IFoodDTO {
  id: string
  name: string
  price: number
}

export default interface IGetFoodsRepository {
  getAll(): Promise<IFoodDTO[]>
}

export type { IFoodDTO }
