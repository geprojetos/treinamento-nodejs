import { IUseGetAllTodo } from "."

const useGetAllTodoEntities = ({ service }: IUseGetAllTodo) => {
  const get = async () => {
    return await service.getAll()
  }

  return {
    get,
  }
}

export default useGetAllTodoEntities
