import { readFileSync } from "fs"
import { join } from "path"
import IFoodDTOV6 from "./IFoodDTO"
import IDatabaseV6 from "./IDatabase"

export default class DatabaseFileAdapterV6 implements IDatabaseV6 {
  constructor() {}

  async get(): Promise<IFoodDTOV6[]> {
    const path = join(__dirname, "..", "..", "database", "db.json")
    const data = readFileSync(path, { encoding: "utf8", flag: "r" })
    const output: IFoodDTOV6[] = JSON.parse(data).foods
    return output
  }
}
