import useAddEntities, { IResult } from "./entities"

interface ITodo {
  id: string
  todo: string
  message?: string
}

const useAddTodo = (todo: string) => {
  const { invalidRules, isInvalid, isSuccess } = useAddEntities(todo)

  const handleAdd = (): IResult | ITodo => {
    if (isInvalid) {
      return invalidRules()
    }
    return isSuccess()
  }

  return { handleAdd }
}

export default useAddTodo
export type { ITodo }
