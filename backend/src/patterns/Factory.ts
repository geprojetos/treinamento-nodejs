interface ICalculate {
  calculate(type: string): number
}

enum CalculateTypeEnum {
  DAY = "DAY",
  MONTH = "MONTH",
}

class FactoryCalculate {
  static create(type: CalculateTypeEnum) {
    if (type === CalculateTypeEnum.DAY) return new CalculateDay()
    if (type === CalculateTypeEnum.MONTH) return new CalculateMonth()
  }
}

class CalculateDay implements ICalculate {
  calculate(): number {
    return 10
  }
}

class CalculateMonth implements ICalculate {
  calculate(): number {
    return 20
  }
}

export default FactoryCalculate
export { CalculateTypeEnum }
