import { readFileSync } from "fs"
import { join } from "path"
import IGetFoodsDatabase from "../v11/IGetFoodsDatabase"
import { IFood } from "../v11/IRepository"

export default class DatabaseFileAdapter implements IGetFoodsDatabase {
  constructor() {}

  async getAll(): Promise<IFood[]> {
    const path = join(__dirname, "..", "..", "database", "db.json")
    const data = readFileSync(path, { encoding: "utf8", flag: "r" })
    const output: IFood[] = JSON.parse(data).foods
    return output
  }
}
