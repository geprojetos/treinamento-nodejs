import EntityProduct from "./domain/Product"
import { IGateway } from "../infra/gateway"

class UseCaseProduct {
  constructor(private _gateway: IGateway) {}

  async create(req: any) {
    try {
      const { name, description, price, category } = req.body
      const entityProduct = new EntityProduct(
        name,
        description,
        price,
        category
      )
      if (entityProduct.error.message) {
        return entityProduct.error
      }
      const output = await this._gateway.create(entityProduct.product)
      return output
    } catch (error) {
      console.log("Create application product error", error.message)
    }
  }

  async get() {
    try {
      const output = await this._gateway.get()
      return output
    } catch (error) {
      console.log("Get product error", error.message)
    }
  }

  async patch(req: any) {
    try {
      const input = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      }
      const { data } = await this._gateway.get()
      if (EntityProduct.isInvalidToPatch(input.id, data)?.message) {
        return EntityProduct.isInvalidToPatch(input.id, data)
      }
      const output = await this._gateway.patch(input)
      return output
    } catch (error) {
      console.log("Edit application product error", error.message)
    }
  }

  async delete(req: any) {
    try {
      const id = req.params.id
      const { data } = await this._gateway.get()
      if (EntityProduct.isInvalidToDelete(id, data)?.message) {
        return EntityProduct.isInvalidToDelete(id, data)
      }
      const output = await this._gateway.delete(id)
      return output
    } catch (error) {
      console.log("Delete product error", error.message)
    }
  }
}

export default UseCaseProduct
