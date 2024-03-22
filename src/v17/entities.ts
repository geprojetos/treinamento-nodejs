interface IResult {
  message: string
}
const useAddEntities = (input: string) => {
  const _isClean = !input
  const _isMaxLength = input.length > 15
  const _isMinLength = input && input.length < 5
  const _isStartInvalidCharacter = input.startsWith("@")
  const _isEndInvalidCharacter = input.endsWith("$")
  const _isEndInvalidCharacterCommercial = input.endsWith("&")
  const isInvalid =
    _isClean ||
    _isMinLength ||
    _isMaxLength ||
    _isStartInvalidCharacter ||
    _isEndInvalidCharacter ||
    _isEndInvalidCharacterCommercial

  let result: IResult = {
    message: "",
  }

  const invalidRules = () => {
    _clean()
    _minLength()
    _maxLength()
    _startInvalidCharacter()
    _endInvalidCharacter()
    _endInvalidCharacterCommercial()
    return result
  }

  const _clean = () => {
    if (_isClean) {
      result = { message: "Is not possible add todo when clean value" }
    }
  }

  const _minLength = () => {
    if (_isMinLength) {
      result = { message: "Is not possible add todo when min length < 5" }
    }
  }

  const _maxLength = () => {
    if (_isMaxLength) {
      result = { message: "Is not possible add todo when length > 15" }
    }
  }

  const _startInvalidCharacter = () => {
    if (_isStartInvalidCharacter) {
      result = { message: "Is not possible add todo when start character @" }
    }
  }

  const _endInvalidCharacter = () => {
    if (_isEndInvalidCharacter) {
      result = {
        message: "Is not possible add todo when end character $",
      }
    }
  }

  const _endInvalidCharacterCommercial = () => {
    if (_isEndInvalidCharacterCommercial) {
      result = {
        message: "Is not possible add todo when end character &",
      }
    }
  }

  const isSuccess = () => {
    return {
      id: String(Math.floor(Math.random() * 999)),
      todo: input,
      message: "Added success",
    }
  }

  return {
    invalidRules,
    isInvalid,
    isSuccess,
  }
}

export default useAddEntities
export type { IResult }
