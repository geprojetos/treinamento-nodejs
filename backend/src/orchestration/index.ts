interface ICalculate {
  id: string
  value: number
}

const useFare = (input: ICalculate[]) => {
  const { rulesEntities } = useConditions(input)

  const orchestration = () => {
    if (rulesEntities) {
      return useEntities(input)
    }
    return _success(input)
  }

  const _success = (input: ICalculate[]) => {
    return input.map((item) => ({
      ...item,
      value: fare(item.value),
    }))
  }

  const fare = (input: number) => {
    return (10 / 100) * input + input
  }

  return {
    orchestration,
    fare,
  }
}

const useConditions = (input: ICalculate[]) => {
  const withData = input.length
  const cleanData = !input.length
  const negativeValue = input.some((item) => item.value < 0)
  const rulesEntities = cleanData || negativeValue

  return {
    withData,
    cleanData,
    negativeValue,
    rulesEntities,
  }
}

const useEntities = (input: ICalculate[]) => {
  const { cleanData, negativeValue } = useConditions(input)

  const _execute = () => {
    if (cleanData) {
      return _clean()
    }

    if (negativeValue) {
      return _negative()
    }
  }

  const _clean = () => {
    return {
      message: "Is not possible calculate fare for clean data",
    }
  }

  const _negative = () => {
    return {
      message: "Is not possible calculate fare for negative value",
    }
  }

  return _execute()
}

export default useFare
export type { ICalculate }

// - controller/
//   - models/
//     - useFare/
//       - index.ts
//       - index.spec.ts
//       - useEntities/
//         - index.ts
//         - index.spec.ts
//       - useConditions/
//         - index.ts
//         - index.spec.ts
//   - repository
//     - index.ts
//     - index.spec.ts
