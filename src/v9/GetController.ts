import HttpServerExpressAdapter from "./HttpServerExpressAdapter"
import UseCaseFood from "./UseCaseFood"

export default class GetController {
  constructor(
    private _httpServerExpressAdapter: HttpServerExpressAdapter,
    private _useCase: UseCaseFood
  ) {}

  execute() {
    this._httpServerExpressAdapter.get("/foods", async (req, res) => {
      try {
        const output = await this._useCase.get()
        return output
      } catch (error) {
        console.log("deu ruim", error)
      }
    })
  }
}
