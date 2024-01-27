import IFoodDTOV7 from "./IFoodsDTO"

export default interface IDatabaseV7 {
  get(): Promise<IFoodDTOV7[]>
}
