import IFoodsDTOV7 from "./IFoodsDTO"

export default interface IDatabaseV7 {
  get(): Promise<IFoodsDTOV7[]>
}
