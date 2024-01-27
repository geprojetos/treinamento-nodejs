import IFoodDTOV4 from "./IFoodDTO"

export default interface IFoodRepositoryV4 {
  getFoods(): Promise<IFoodDTOV4[]>
}
