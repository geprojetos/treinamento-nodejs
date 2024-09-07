import { IAddTodo, IUseAddTodo } from "."

interface IUseAddTodoEntities extends IUseAddTodo {
  todo: IAddTodo
}

const useAddTodoEntities = ({ todo, service }: IUseAddTodoEntities) => {
  const _isInvalidName = !todo?.name
  const isInvalid = _isInvalidName
  const isValid = !isInvalid

  let result = {
    message: "",
  }

  const invalidRules = async () => {
    _invalidName()
    return result
  }

  const validRules = async () => {
    await _success()
    return result
  }

  const _invalidName = () => {
    if (_isInvalidName) {
      result = {
        message: "Name is required",
      }
    }
  }

  const _success = async () => {
    const response = await service.add(todo)
    console.log("🚀 ~ const_success= ~ response:", response)
    if (isValid && response?.status == 201) {
      result = {
        message: "Success adding todo",
      }
    }
  }

  return {
    invalidRules,
    validRules,
    isInvalid,
  }
}

export default useAddTodoEntities
