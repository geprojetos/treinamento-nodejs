import { IGateway } from "./Gateway"
import { inject, RegistryV1 } from "./Registry"

class UseCaseExampleV1 {
  private _registry: RegistryV1
  private _gateway: IGateway

  constructor() {
    this._registry = RegistryV1.getInstance()
    this._gateway = this._registry.inject("messages")
  }

  execute() {
    return this._gateway.get()
  }
}

class UseCaseExampleV2 {
  @inject("messages")
  gateway?: IGateway

  constructor() {}

  execute() {
    return this.gateway.get()
  }
}

export { UseCaseExampleV1, UseCaseExampleV2 }
