import IFoodDTOV7 from "./IFoodsDTO"

export default interface IHttpClientV7 {
  get(): Promise<IFoodDTOV7[]>
}
