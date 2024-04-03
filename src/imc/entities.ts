import { IGetCategory, IUsePerson } from "."

interface IResultIMC {
  total: number
  message: string
}

interface IGetMessage {
  input: number
  message: string
}

const usePersonGetCategoryEntities = ({ age }: IUsePerson) => {
  const _isNegativeAge = age < 0
  const _isChildrenAge = age >= 0 && age <= 10
  const _isPreAdolescentAge = age >= 11
  const _isAdolescentAge = age >= 14
  const _isAdultAge = age >= 18
  const _isMaturityAge = age >= 30
  const isValidAge =
    _isChildrenAge ||
    _isPreAdolescentAge ||
    _isAdolescentAge ||
    _isAdultAge ||
    _isMaturityAge
  const isInValidAge = _isNegativeAge

  let result: IGetCategory = {
    message: "",
  }

  const rulesInValidAge = () => {
    _negativeAge()
    return result
  }

  const rulesValidAge = () => {
    _childrenAge()
    _preAdolescentAge()
    _adolescentAge()
    _adultAge()
    _maturityAge()
    return result
  }

  const _negativeAge = () => {
    if (_isNegativeAge) {
      result = {
        message: "It is invalid age",
      }
      return result
    }
  }

  const _childrenAge = () => {
    if (_isChildrenAge) {
      result = {
        message: "It is a children",
      }
    }
  }

  const _preAdolescentAge = () => {
    if (_isPreAdolescentAge) {
      result = {
        message: "It is a pre-adolescent",
      }
    }
  }

  const _adolescentAge = () => {
    if (_isAdolescentAge) {
      result = {
        message: "It is a adolescent",
      }
    }
  }

  const _adultAge = () => {
    if (_isAdultAge) {
      result = {
        message: "It is a adult",
      }
    }
  }

  const _maturityAge = () => {
    if (_isMaturityAge) {
      result = {
        message: "It is a maturity",
      }
    }
  }

  return {
    rulesValidAge,
    rulesInValidAge,
    isValidAge,
    isInValidAge,
  }
}

const usePersonCalculateIMCEntities = ({ imc }: IUsePerson) => {
  const _isInvalidWeight = imc?.weight <= 0
  const _isInvalidHeight = imc?.height <= 0
  const isInvalidIMC = _isInvalidWeight || _isInvalidHeight
  const isValidIMC = !isInvalidIMC

  let result: IResultIMC = {
    total: 0,
    message: "",
  }

  const rulesValidIMC = () => {
    _veryLow()
    _low()
    _normal()
    _over()
    _obesity()
    return result
  }

  const rulesInValidIMC = () => {
    _invalidWeight()
    _invalidHeight()
    return result
  }

  const _veryLow = () => {
    const _total = _calculateTotal()
    const _isVeryLow = _total <= 16.9

    if (isValidIMC && _isVeryLow) {
      result = {
        total: _total,
        message: "Muito abaixo do peso",
      }
    }
  }

  const _low = () => {
    const _total = _calculateTotal()
    const _isLow = _total >= 17 && _total <= 18.4

    if (isValidIMC && _isLow) {
      result = {
        total: _total,
        message: "Abaixo do peso",
      }
    }
  }

  const _normal = () => {
    const _total = _calculateTotal()
    const _isNormal = _total >= 18.5 && _total <= 24.9

    if (isValidIMC && _isNormal) {
      result = {
        total: _total,
        message: "Peso normal",
      }
    }
  }

  const _over = () => {
    const _total = _calculateTotal()
    const _isOver = _total >= 25 && _total <= 29.9

    if (isValidIMC && _isOver) {
      result = {
        total: _total,
        message: "Acima do peso",
      }
    }
  }

  const _obesity = () => {
    const _total = _calculateTotal()
    const _isOver = _total >= 41

    if (isValidIMC && _isOver) {
      result = {
        total: _total,
        message: "Obesidade grau 3",
      }
    }
  }

  const _calculateTotal = () => {
    const _calculate = imc.weight / (imc.height * imc.height)
    return Math.trunc(_calculate * 100) / 100
  }

  const _invalidWeight = () => {
    if (_isInvalidWeight) {
      result = {
        total: 0,
        message: "Invalid weight",
      }
    }
  }

  const _invalidHeight = () => {
    if (_isInvalidHeight) {
      result = {
        total: 0,
        message: "Invalid height",
      }
    }
  }

  return {
    rulesValidIMC,
    rulesInValidIMC,
    isInvalidIMC,
  }
}

export { usePersonGetCategoryEntities, usePersonCalculateIMCEntities }
