interface IFoodDTO {
  id: string
  name: string
  price: number
}

export default interface IGetFoodRepository {
  getAll(): Promise<IFoodDTO[]>
}

export type { IFoodDTO }
