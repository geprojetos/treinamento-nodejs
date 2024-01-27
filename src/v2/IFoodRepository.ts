import { IFoodDTOV2 } from "./IFoodDTO"

interface IFoodRepositoryV2 {
  get(): Promise<IFoodDTOV2[]>
}

export { IFoodRepositoryV2 }
