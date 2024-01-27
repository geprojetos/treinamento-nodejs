import IFoodDTOV7 from "./IFoodsDTO"

export default interface IGetFoodsRepositoryV7 {
  getFoods(): Promise<IFoodDTOV7[]>
}
