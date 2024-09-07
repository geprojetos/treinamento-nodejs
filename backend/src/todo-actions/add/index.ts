import { TodoService } from ".."
import useAddTodoEntities from "./entities"

interface IUseAddTodo {
  service: TodoService
}

interface IAddTodo {
  id?: string
  name: string
}

const useAddTodo = ({ service }: IUseAddTodo) => {
  const add = async (todo: IAddTodo) => {
    const { invalidRules, isInvalid, validRules } = useAddTodoEntities({
      service,
      todo,
    })

    if (isInvalid) {
      return invalidRules()
    }
    return validRules()
  }

  return {
    add,
  }
}

export default useAddTodo
export type { IAddTodo, IUseAddTodo }
