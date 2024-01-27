import IFoodDTOV6 from "./IFoodDTO"

export default interface IGetFoodRepositoryV6 {
  getAll(): Promise<IFoodDTOV6[]>
}
