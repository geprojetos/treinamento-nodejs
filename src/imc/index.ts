import {
  usePersonCalculateIMCEntities,
  usePersonGetCategoryEntities,
} from "./entities"

interface IUsePerson {
  age?: number
  imc?: IIMC
}

interface IIMC {
  weight: number
  height: number
}

interface IGetCategory {
  message: string
}

const usePerson = ({ age, imc }: IUsePerson) => {
  const { rulesValidAge, rulesInValidAge, isInValidAge } =
    usePersonGetCategoryEntities({
      age,
    })
  const { rulesValidIMC, isInvalidIMC, rulesInValidIMC } =
    usePersonCalculateIMCEntities({ imc })

  const getCategoryAge = (): IGetCategory => {
    if (isInValidAge) {
      return rulesInValidAge()
    }
    return rulesValidAge()
  }

  const calculateIMC = () => {
    if (isInvalidIMC) {
      return rulesInValidIMC()
    }
    return rulesValidIMC()
  }

  return {
    getCategoryAge,
    calculateIMC,
  }
}

export default usePerson
export type { IUsePerson, IGetCategory, IIMC }
