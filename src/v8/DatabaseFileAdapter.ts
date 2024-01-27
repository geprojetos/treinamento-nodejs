import { readFileSync } from "fs"
import { join } from "path"
import IDatabaseV8 from "./IDatabase"
import IFoodDTOV7 from "./IFoodsDTO"

export default class DatabaseFileAdapterV8 implements IDatabaseV8 {
  constructor() {}

  async get(): Promise<IFoodDTOV7[]> {
    const path = join(__dirname, "..", "..", "database", "db.json")
    const data = readFileSync(path, { encoding: "utf8", flag: "r" })
    const output: IFoodDTOV7[] = JSON.parse(data).foods
    return output
  }
}
