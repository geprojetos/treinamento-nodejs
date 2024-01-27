import IFoodDTOV4 from "./IFoodDTO"

export default interface IDatabaseV4 {
  getAll(): Promise<IFoodDTOV4[]>
}
