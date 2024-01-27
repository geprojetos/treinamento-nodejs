interface IFood {
  id: string
  name: string
  price: number
}

export default interface IRepository {
  get(): Promise<IFood[]>
}

export type { IFood }
