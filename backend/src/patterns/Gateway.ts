export interface IGateway {
  get(): any
}

class GatewayV1 implements IGateway {
  get() {
    return {
      message: "v1 ok",
    }
  }
}
export { GatewayV1 }
