import IFoodsDTOV7 from "./IFoodsDTO"

export default interface IGetFoodsRepositoryV7 {
  getAll(): Promise<IFoodsDTOV7[]>
}
