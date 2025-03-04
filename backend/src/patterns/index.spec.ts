import { GatewayV1 } from "./Gateway"
import { RegistryV1 } from "./Registry"
import { UseCaseExampleV1, UseCaseExampleV2 } from "./UseCaseExample"

describe("Registry", () => {
  it("Should be able using registry", () => {
    const gateway = new GatewayV1()
    const registry = RegistryV1.getInstance()
    registry.provide("messages", gateway)
    const useCase = new UseCaseExampleV1()
    expect(useCase.execute()).toEqual({ message: "v1 ok" })
  })

  it("Should be able using registry sintax inject", () => {
    const gateway = new GatewayV1()
    const registry = RegistryV1.getInstance()
    registry.provide("messages", gateway)
    const useCase = new UseCaseExampleV2()
    expect(useCase.execute()).toEqual({ message: "v1 ok" })
  })
})
