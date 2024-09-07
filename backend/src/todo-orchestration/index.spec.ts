import useAddTodo from "."

describe("[V17] useAddTodo", () => {
  test("should be able add todo", () => {
    const input = "test-1"
    const { handleAdd } = useAddTodo(input)
    const output = { todo: "test-1" }
    const result = handleAdd()
    expect(result.todo).toEqual(output.todo)
    expect(result.message).toEqual("Added success")
  })

  test("should be able not add todo when input clean", () => {
    const input = ""
    const { handleAdd } = useAddTodo(input)
    const output = { message: "Is not possible add todo when clean value" }
    expect(handleAdd()).toEqual(output)
  })

  test("should be able not add todo when input length > 15", () => {
    const input = "0000-1111-2222-3333"
    const { handleAdd } = useAddTodo(input)
    const output = { message: "Is not possible add todo when length > 15" }
    expect(handleAdd()).toEqual(output)
  })

  test("should be able not add todo when input min length < 5", () => {
    const input = "0000"
    const { handleAdd } = useAddTodo(input)
    const output = { message: "Is not possible add todo when min length < 5" }
    expect(handleAdd()).toEqual(output)
  })

  test("should be able not add todo when input when start character @", () => {
    const input = "@test-1"
    const { handleAdd } = useAddTodo(input)
    const output = {
      message: "Is not possible add todo when start character @",
    }
    expect(handleAdd()).toEqual(output)
  })

  test("should be able not add todo when input when end character $", () => {
    const input = "test-1$"
    const { handleAdd } = useAddTodo(input)
    const output = {
      message: "Is not possible add todo when end character $",
    }
    expect(handleAdd()).toEqual(output)
  })

  test("should be able not add todo when input when end character &", () => {
    const input = "test-1&"
    const { handleAdd } = useAddTodo(input)
    const output = {
      message: "Is not possible add todo when end character &",
    }
    expect(handleAdd()).toEqual(output)
  })
})
