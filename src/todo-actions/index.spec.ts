import TodoMemory from "database/todo-memory"
import useTodo, { IUseTodo } from "./"
import { IAddTodo } from "./add"

describe("[integration] TODO ACTIONS - ADD", () => {
  let init: IUseTodo
  let todoService: TodoMemory

  beforeAll(() => {
    todoService = TodoMemory.getInstance()
    init = {
      service: todoService,
    }
  })

  afterAll(() => {
    TodoMemory.clearInstance()
  })

  test("Should be able add todo", async () => {
    const { add, getAll } = useTodo(init)
    const input = {
      name: "test-0",
    }
    const addOutput = {
      message: "Success adding todo",
    }
    const getAllOutput = [input]

    add(input).then((todo) => {
      expect(todo).toEqual(addOutput)
    })
    getAll().then((todos: IAddTodo[]) => {
      todos.forEach((todo) => delete todo.id)
      expect(todos).toEqual(getAllOutput)
    })
  })

  test("Should be able not add todo when clean value", async () => {
    const { add } = useTodo(init)
    const input = {
      name: "",
    }
    const output = {
      message: "Name is required",
    }
    await add(input).then((todo) => {
      expect(todo).toEqual(output)
    })
  })
})
