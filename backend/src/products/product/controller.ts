import UseCaseProduct from "./useCase"
import { IServerClient } from "../infra/serverClient/ServerClientExpressAdapter"

class ControllerProduct {
  constructor(
    private _useCaseApplication: UseCaseProduct,
    private _serverClient: IServerClient
  ) {}

  execute() {
    this._serverClient.get("/products", async () => {
      try {
        const output = await this._useCaseApplication.get()
        return output
      } catch (error) {
        console.log("Get drivers product error", error.message)
      }
    })

    this._serverClient.post("/products", async (req) => {
      try {
        const output = await this._useCaseApplication.create(req)
        return output
      } catch (error) {
        console.log("Create drivers product error", error.message)
      }
    })

    this._serverClient.patch("/products/:id", async (req) => {
      try {
        const output = await this._useCaseApplication.patch(req)
        return output
      } catch (error) {
        console.log("Edit resources product error", error.message)
      }
    })

    this._serverClient.delete("/products/:id", async (req) => {
      try {
        const output = await this._useCaseApplication.delete(req)
        return output
      } catch (error) {
        console.log("Delete product error", error.message)
      }
    })
  }
}

export default ControllerProduct
