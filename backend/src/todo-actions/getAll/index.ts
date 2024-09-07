import { IUseTodo } from ".."
import useGetAllTodoEntities from "./entities"

interface IUseGetAllTodo extends IUseTodo {}

const useGetAllTodo = ({ service }: IUseGetAllTodo) => {
  const { get } = useGetAllTodoEntities({ service })

  const getAll = async () => {
    return get()
  }

  return {
    getAll,
  }
}

export default useGetAllTodo
export type { IUseGetAllTodo }
