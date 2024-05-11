import useAddTodo, { IAddTodo } from "./add"
import useGetAllTodo from "./getAll"

interface TodoService {
  getAll(): IAddTodo[]
  add(todo: IAddTodo): Promise<any>
}

interface IUseTodo {
  service: TodoService
}

const useTodo = ({ service }: IUseTodo) => {
  const { add } = useAddTodo({ service })
  const { getAll } = useGetAllTodo({ service })

  return {
    add,
    getAll,
  }
}

export default useTodo
export type { TodoService, IUseTodo }
