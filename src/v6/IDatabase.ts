import IFoodDTOV6 from "./IFoodDTO"

export default interface IDatabaseV6 {
  get(): Promise<IFoodDTOV6[]>
}
