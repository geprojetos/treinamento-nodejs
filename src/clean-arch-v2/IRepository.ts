interface IFood {
  id: string
  name: string
  price: number
}

export default interface IGetFoodsRepository {
  getAll(): Promise<IFood[]>
}

export type { IFood }
