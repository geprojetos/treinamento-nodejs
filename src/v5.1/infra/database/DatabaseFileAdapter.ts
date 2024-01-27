import IDatabase from "../../adapters/gateways/IDatabase"
import { readFileSync } from "fs"
import { join } from "path"
import { IFoodDTOV5 } from "../../application/useCases/FoodUseCase"

export default class DatabaseFileAdapter implements IDatabase {
  constructor() {}

  async get(): Promise<IFoodDTOV5[]> {
    const path = join(__dirname, "..", "..", "..", "..", "database", "db.json")
    const data = readFileSync(path, { encoding: "utf8", flag: "r" })
    const output: IFoodDTOV5[] = JSON.parse(data).foods
    return output
  }
}
