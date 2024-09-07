import { IFoods } from "./Food"

interface IDatabase {
  getFoods(): Promise<IFoods[]>
}

export default IDatabase
