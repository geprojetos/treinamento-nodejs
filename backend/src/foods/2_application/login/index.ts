import { ILoginDatabase } from "src/foods/3_resources/database/LoginDatabase"

class LoginApplication {
  constructor(private _database: ILoginDatabase) {}

  async execute(req: any): Promise<any> {
    const response = await this._database.create(req.body)
    return response
  }
}

export default LoginApplication
