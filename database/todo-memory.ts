import { TodoService } from "src/todo-actions"
import { IAddTodo } from "src/todo-actions/add"

interface Todo {
  id?: string
  name: string
}

class TodoMemory implements TodoService {
  private static instance?: TodoMemory
  public _todos: Todo[] = []

  async add({ name }: Todo) {
    const todo: Todo = {
      id: String(Math.floor(Math.random() * 9999)),
      name,
    }
    this._todos.push(todo)

    return {
      status: 201,
    }
  }

  getAll(): IAddTodo[] {
    return this._todos
  }

  public static getInstance(): TodoMemory {
    if (!TodoMemory.instance) {
      TodoMemory.instance = new TodoMemory()
    }
    return TodoMemory.instance
  }

  public static clearInstance() {
    TodoMemory.instance = undefined
  }
}

export default TodoMemory
